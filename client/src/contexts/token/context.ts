import { createContext } from 'react';

type Token = string | null;

export const TokenContext = createContext<{
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token>>;
} | null>(null);
