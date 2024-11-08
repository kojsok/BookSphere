/**
 * Supported currency codes for formatting.
 */
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

/**
 * Formats a price according to the specified locale and currency code.
 *
 * @param price - The numeric value representing the price to be formatted.
 * @param locale - The locale to use for formatting, such as "en-US" or "ru-RU".
 * @param currency - The currency code (e.g., "USD", "EUR") to format the price.
 * @returns A string representing the formatted price, with currency symbol.
 *
 * @example
 * formatPrice(1234.5, "en-US", "USD"); // "$1,234.50"
 * formatPrice(1234.5, "ru-RU", "RUB"); // "1 234,50 ₽"
 */
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
