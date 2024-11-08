/**
 * Converts a total number of seconds into an object with hours, minutes, and seconds.
 *
 * @param totalSeconds - The total time in seconds to be converted.
 * @returns An object with `hours`, `min`, and `sec` properties, representing
 * the hours, minutes, and seconds derived from the total seconds.
 *
 * @example
 * getTimePartsFromSec(3665); // { hours: 1, min: 1, sec: 5 }
 */
export const getTimePartsFromSec = (
  totalSeconds: number
): { hours: number; min: number; sec: number } => {
  const hours = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = totalSeconds % 60;
  return { hours, min, sec };
};
