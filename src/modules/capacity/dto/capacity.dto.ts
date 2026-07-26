import type { TCurrency } from '../../../common/types';
import type { ReservationItemDto } from './reserve.dto';

export interface CapacityDto {
  totalCapacity: number;
  reservedCapacity: number;
  availableCapacity: number;
  currencyList: TCurrency[];
  baseCurrency: TCurrency;
  reservedCapacityList: ReservationItemDto[];
}
