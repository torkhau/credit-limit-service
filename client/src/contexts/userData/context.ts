import { createContext, type Dispatch, type SetStateAction } from 'react';

interface ReservationItem {
  reservationId: string;
  amount: number;
  baseAmount?: number;
  createdAt: string;
}

export interface Capacity {
  totalCapacity: number;
  reservedCapacity: number;
  availableCapacity: number;
  currencyList: string[];
  baseCurrency: string;
  reservedCapacityList: ReservationItem[];
}

export const CapacityContext = createContext<{
  capacity: Capacity | null;
  setCapacity: Dispatch<SetStateAction<Capacity | null>>;
} | null>(null);
