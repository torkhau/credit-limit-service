import { useState, type ReactNode } from 'react';
import { TokenContext } from './context';

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <TokenContext value={{ token, setToken, isAuthorized, setIsAuthorized }}>
      {children}
    </TokenContext>
  );
}
