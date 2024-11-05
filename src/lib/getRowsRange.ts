/**
 * Calculates the range of rows to fetch based on the given page and offset.
 * Primarily used for range queries in Supabase to paginate results.
 *
 * @param offset - The number of rows per page.
 * @param page - The current page index (0-based).
 * @returns An object with `from` and `to` properties, representing the starting and ending row indices for the current page.
 *
 * This range can be directly used in Supabase queries with `from` and `to` as the bounds.
 *
 * @example
 * getRowsRange(10, 1); // { from: 11, to: 21 }
 */
export const getRowsRange = (
  offset: number,
  page: number
): { from: number; to: number } => {
  let from = page * offset;
  if (page > 0) from += 1;
  const to = from + offset;
  return { from, to };
};
