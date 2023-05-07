export function getRaspisanFormattedDate(input: Date): string {
  const date = new Date(input);
  return date.getDate()  + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
}
