import { useState, type ReactNode } from 'react';
import { CapacityContext, type Capacity } from './context';

export function CapacityProvider({ children }: { children: ReactNode }) {
  const [capacity, setCapacity] = useState<Capacity | null>(null);

  return (
    <CapacityContext value={{ capacity, setCapacity }}>
      {children}
    </CapacityContext>
  );
}
