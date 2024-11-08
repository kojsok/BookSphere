/**
 * Determines the correct word ending based on the given number.
 * Useful for languages with complex pluralization rules, like Russian.
 *
 * @param num - The number used to determine the correct word ending.
 * @param endings - An array of three possible endings:
 *   - `endings[0]` for cases where `num` ends in 1 (excluding 11),
 *   - `endings[1]` for cases where `num` ends in 2, 3, or 4 (excluding 12-14),
 *   - `endings[2]` for all other cases.
 * @returns The appropriate word ending based on the number.
 *
 * @example
 * getWordEndings(1, ["яблоко", "яблока", "яблок"]); // "яблоко"
 * getWordEndings(22, ["яблоко", "яблока", "яблок"]); // "яблока"
 * getWordEndings(5, ["яблоко", "яблока", "яблок"]); // "яблок"
 */
export const getWordEndings = (
  num: number,
  endings: [string, string, string]
): string => {
  num = Math.abs(num);
  num %= 100;
  if (num >= 11 && num <= 19) {
    return endings[2];
  }
  num %= 10;
  if (num === 1) {
    return endings[0];
  }
  if (num >= 2 && num <= 4) {
    return endings[1];
  }
  return endings[2];
};

/**
 * Returns the correct word ending for "hour" in Russian based on the given number.
 *
 * @param num - The number of hours used to determine the correct word ending.
 * @returns The appropriate form of "час" based on the number.
 *
 * @example
 * getHHEndings(1); // "час"
 * getHHEndings(3); // "часа"
 * getHHEndings(5); // "часов"
 */

export const getHHEndings = (num: number): string => {
  return getWordEndings(num, ["час", "часа", "часов"]);
};

/**
 * Returns the correct word ending for "minute" in Russian based on the given number.
 *
 * @param num - The number of minutes used to determine the correct word ending.
 * @returns The appropriate form of "минута" based on the number.
 *
 * @example
 * getMMEndings(1); // "минута"
 * getMMEndings(3); // "минуты"
 * getMMEndings(5); // "минут"
 */
export const getMMEndings = (num: number): string => {
  return getWordEndings(num, ["минута", "минуты", "минут"]);
};
