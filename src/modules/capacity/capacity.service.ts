import { BadRequestException, Injectable } from '@nestjs/common';
import { ALLOWED_CURRENCIES } from '../../common/constants';
import { TCurrency } from '../../common/types';
import { AsyncQueue, convertToUSDCents } from '../../common/utils';
import { InMemoryRepository } from '../repositories';
import { CapacityDto } from './dto/capacity.dto';
import { ReservationItemDto, ReserveDto } from './dto/reserve.dto';

interface DataItem extends Omit<ReservationItemDto, 'amount' | 'baseAmount'> {
  amount: bigint;
  baseAmount?: bigint;
  userId: string;
}

@Injectable()
export class CapacityService {
  private readonly capacityData = new InMemoryRepository<DataItem>();
  private readonly asyncQueue = new AsyncQueue();
  private readonly baseCurrency: TCurrency = 'USD';
  private currentReservationId: number = 1;
  private totalCapacity: bigint = 100n * 100n;

  accountCapacity(userId: string): CapacityDto {
    const userReservations = this.capacityData.findAllByUserId(userId);
    const availableCapacity = this.calculateAvailableCapacity();

    return {
      totalCapacity: Number(this.totalCapacity) / 100,
      availableCapacity: Number(availableCapacity) / 100,
      reservedCapacity: Number(this.totalCapacity - availableCapacity) / 100,
      currencyList: ALLOWED_CURRENCIES,
      baseCurrency: this.baseCurrency,
      reservedCapacityList: userReservations.map(
        ({ reservationId, amount, baseAmount, createdAt, currency }) => ({
          reservationId,
          amount: Number(amount) / 100,
          currency,
          baseAmount: baseAmount ? Number(baseAmount) / 100 : undefined,
          createdAt,
        }),
      ),
    };
  }

  async addReservation(userId: string, data: ReserveDto): Promise<void> {
    await this.asyncQueue.enqueue(() => this.addReservationAsync(userId, data));
  }

  async releaseReservation(
    userId: string,
    reservationId: string,
  ): Promise<void> {
    await this.asyncQueue.enqueue(() =>
      this.releaseReservationAsync(userId, reservationId),
    );
  }

  async updateTotalCapacity(newTotal: number): Promise<void> {
    await this.asyncQueue.enqueue(() =>
      this.updateTotalCapacityAsync(newTotal),
    );
  }

  private calculateAvailableCapacity(): bigint {
    const reservedCapacity = this.capacityData
      .getAll()
      .reduce(
        (acc, { amount, baseAmount }) => acc + (baseAmount ?? amount),
        0n,
      );

    const availableCapacity = this.totalCapacity - reservedCapacity;

    return availableCapacity > 0n ? availableCapacity : 0n;
  }

  private requestedAmount(amount: number, currency: TCurrency = 'USD'): bigint {
    return currency === this.baseCurrency
      ? BigInt(Math.round(amount * 100))
      : convertToUSDCents(amount, currency);
  }

  private addReservationAsync(userId: string, data: ReserveDto): void {
    const availableCapacity = this.calculateAvailableCapacity();
    const requestedAmount = this.requestedAmount(data.amount, data.currency);

    if (requestedAmount > availableCapacity)
      throw new BadRequestException('Insufficient capacity available');

    const reservation: DataItem = {
      reservationId: this.currentReservationId.toString(),
      amount: BigInt(Math.round(data.amount * 100)),
      currency: data.currency,
      baseAmount: data.currency ? requestedAmount : undefined,
      userId: userId,
      createdAt: new Date().toISOString(),
    };

    this.capacityData.create(reservation);
    this.currentReservationId += 1;
  }

  private releaseReservationAsync(userId: string, reservationId: string): void {
    const result = this.capacityData.delete(userId, reservationId);

    if (!result)
      throw new BadRequestException(
        'Reservation not found or does not belong to user',
      );
  }

  private updateTotalCapacityAsync(newTotal: number): void {
    this.totalCapacity = BigInt(Math.round(newTotal * 100));
  }
}
