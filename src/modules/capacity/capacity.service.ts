import { Injectable } from '@nestjs/common';
import { CURRENCY_RATES } from '../../common/constants';
import { typedKeys } from '../../common/utils';
import { CapacityDto } from './dto/capacity.dto';
import { ReserveDto } from './dto/reserve.dto';

@Injectable()
export class CapacityService {
  accountCapacity(): CapacityDto {
    return {
      totalCapacity: 100,
      reservedCapacity: 10 + 23.53 + 6.67 + 3.95,
      availableCapacity: 55.85,
      currencyList: typedKeys(CURRENCY_RATES),
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
