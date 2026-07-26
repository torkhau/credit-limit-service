import { Injectable } from '@nestjs/common';
import { ALLOWED_CURRENCIES } from '../../common/constants';
import { InMemoryRepository } from '../repositories';
import { CapacityDto } from './dto/capacity.dto';
import { ReservationItemDto, ReserveDto } from './dto/reserve.dto';
import { TCurrency } from '../../common/types';

interface DataItem extends Omit<ReservationItemDto, 'amount' | 'baseAmount'> {
  amount: bigint;
  baseAmount?: bigint;
  userId: string;
  operationId: string;
}

@Injectable()
export class CapacityService {
  private capacityData: InMemoryRepository<DataItem>;
  private currentOperationId: number = 1;
  private readonly baseCurrency: TCurrency = 'USD';
  private totalCapacity: number = 100;

  constructor() {
    this.capacityData = new InMemoryRepository<DataItem>();
  }

  accountCapacity(userId: string): CapacityDto {
    console.log('Fetching capacity for user:', userId);

    return {
      totalCapacity: this.totalCapacity,
      reservedCapacity: 44.15,
      availableCapacity: this.totalCapacity - 44.15,
      baseCurrency: this.baseCurrency,
      currencyList: ALLOWED_CURRENCIES,
      reservedCapacityList: [
        {
          reservationId: '1',
          amount: 10,
          currency: 'USD',
          createdAt: new Date().toISOString(),
        },
        {
          reservationId: '2',
          amount: 20,
          baseAmount: 23.53,
          currency: 'EUR',
          createdAt: new Date().toISOString(),
        },
        {
          reservationId: '3',
          amount: 5,
          baseAmount: 6.67,
          currency: 'GBP',
          createdAt: new Date().toISOString(),
        },
        {
          reservationId: '4',
          amount: 15,
          baseAmount: 3.95,
          currency: 'PLN',
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  addReservation(data: ReserveDto): string {
    console.log('Reservation added:', data);

    return 'Capacity reserved';
  }

  releaseReservation(reservationId: string): string {
    console.log('Reservation released:', reservationId);

    return 'Capacity released';
  }
}
