import { Injectable } from '@nestjs/common';
import { ALLOWED_CURRENCIES } from '../../common/constants';
import { TCurrency } from '../../common/types';
import { InMemoryRepository } from '../repositories';
import { CapacityDto } from './dto/capacity.dto';
import { ReservationItemDto, ReserveDto } from './dto/reserve.dto';

interface DataItem extends Omit<ReservationItemDto, 'amount' | 'baseAmount'> {
  amount: bigint;
  baseAmount?: bigint;
  userId: string;
  operationId: string;
}

@Injectable()
export class CapacityService {
  private readonly capacityData: InMemoryRepository<DataItem>;
  private readonly baseCurrency: TCurrency = 'USD';
  private currentOperationId: number = 1;
  private totalCapacity: bigint = 100n * 100n;

  constructor() {
    this.capacityData = new InMemoryRepository<DataItem>();
  }

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
        ({ reservationId, amount, baseAmount, createdAt }) => ({
          reservationId,
          amount: Number(amount) / 100,
          baseAmount: baseAmount ? Number(baseAmount) / 100 : undefined,
          createdAt,
        }),
      ),
    };
  }

  addReservation(userId: string, data: ReserveDto): boolean {
    const availableCapacity = this.calculateAvailableCapacity();
    const requestedAmount = BigInt(data.amount * 100);

    if (requestedAmount > availableCapacity)
      throw new Error('Insufficient capacity available');

    const reservation: DataItem = {
      reservationId: this.currentOperationId.toString(),
      amount: requestedAmount,
      baseAmount: data.currency ? BigInt(data.amount * 100) : undefined,
      userId: userId,
      operationId: this.currentOperationId.toString(),
      createdAt: new Date().toISOString(),
    };

    this.capacityData.create(reservation);
    this.currentOperationId += 1;

    return true;
  }

  releaseReservation(reservationId: string): string {
    console.log('Reservation released:', reservationId);

    return 'Capacity released';
  }

  updateTotalCapacity(newTotal: number): void {
    this.totalCapacity = BigInt(newTotal * 100);
  }

  private calculateAvailableCapacity(): bigint {
    const reservedCapacity = this.capacityData
      .getAll()
      .reduce((acc, item) => acc + item.amount, 0n);
    return this.totalCapacity - reservedCapacity;
  }
}
