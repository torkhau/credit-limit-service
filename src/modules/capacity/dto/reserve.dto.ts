import { Transform } from 'class-transformer';
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
  @Transform(({ value }: { value: unknown }) => {
    const parsed = typeof value === 'string' ? parseFloat(value) : value;

    return typeof parsed === 'number' && !isNaN(parsed) ? parsed : value;
  })
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
