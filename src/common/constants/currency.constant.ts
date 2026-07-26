import { typedKeys } from '../utils';

export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  PLN: 3.8,
};

export const ALLOWED_CURRENCIES = typedKeys(CURRENCY_RATES);
