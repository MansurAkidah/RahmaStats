interface FormatOptions {
  style: string;
  currency: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export const formatNumber = (
  price: number,
  format: string = 'en-IN',
  options: FormatOptions = { style: 'currency', currency: 'KSH' },
): string => {
  return new Intl.NumberFormat(format, {
    currency: options.currency,
  }).format(price);
};
