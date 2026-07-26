import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ALLOWED_CURRENCIES } from '../../../common/constants';
import type { TCurrency } from '../../../common/types';

export class ReserveDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;

  @IsOptional()
  @IsIn(ALLOWED_CURRENCIES)
  currency?: TCurrency;
}

export interface ReservationItemDto extends ReserveDto {
  reservationId: string;
  baseAmount?: number;
  createdAt: string;
}
