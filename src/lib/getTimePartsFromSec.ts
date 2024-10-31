export const getTimePartsFromSec = (
  totalSeconds: number
): { hours: number; min: number; sec: number } => {
  const hours = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = totalSeconds % 60;
  return { hours, min, sec };
};
