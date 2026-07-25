import { useState, type ReactNode } from 'react';
import { TokenContext } from './context';

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  return <TokenContext value={{ token, setToken }}>{children}</TokenContext>;
}
