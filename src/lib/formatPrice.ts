type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "RUB"
  | "CNY"
  | "INR"
  | "BRL"
  | "CAD"
  | "AUD";

export const formatPrice = (
  price: number,
  locale: Intl.LocalesArgument,
  currency: CurrencyCode
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });
  return formatter.format(price);
};
