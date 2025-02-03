export function getRaspDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
}

/**
 * Get special dates for calendars: starts with first day in month, ends in next month + 2 weeks
 * @returns {[Date, Date]}
 */
export function calendarSpecificDates() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthStart = new Date(currentYear, currentMonth, 1);
  const monthEnd = new Date(currentYear, currentMonth + 1, 14);

  return [monthStart, monthEnd];
}

export function isValidDate(d: unknown) {
  // @ts-expect-error ts(2345): хак
  return d instanceof Date && !isNaN(d);
}
