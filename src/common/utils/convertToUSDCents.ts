import { CURRENCY_RATES } from '../constants';
import { TCurrency } from '../types';

export const convertToUSDCents = (
  amount: number,
  currency: TCurrency,
): bigint => {
  const rate = CURRENCY_RATES[currency];

  if (!rate) throw new Error(`Unsupported currency: ${currency}`);

  const inputInCents = Math.round(amount * 100);
  const usdCents = Math.round(inputInCents / rate);

  return BigInt(usdCents);
};
