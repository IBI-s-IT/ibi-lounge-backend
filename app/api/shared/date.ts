export function getRaspDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}.${month}.${year}`;
}

/**
 * @returns {[Date, Date]} - start and end of year dates
 */
export function startEndOfYear() {
  const year = new Date().getFullYear();
  return [new Date(year, 0, 1), new Date(year, 11, 31)];
}
