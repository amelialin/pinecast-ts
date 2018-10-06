export function endOfDay(date: Date): Date {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + 1);
  clone.setHours(-1, 59, 59, 999);
  return clone;
}
export function startOfDay(date: Date): Date {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export function addDays(date: Date, days: number): Date {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
}
