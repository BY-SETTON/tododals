export function onlyDate(date: Date) {
  return date.toISOString().split("T")[0];
}
