import type { TCurrency } from '../../../common/types';

export interface ReserveDto {
  amount: number;
  currency: TCurrency;
}

export interface ReservationItemDto extends ReserveDto {
  reservationId: string;
  baseAmount?: number;
  createdAt: string;
}
