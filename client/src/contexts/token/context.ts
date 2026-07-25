import { createContext, type Dispatch, type SetStateAction } from 'react';

type Token = string | null;

export const TokenContext = createContext<{
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
} | null>(null);
