export const numberToCurrency = (value: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
}