export function getFormattedDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();

  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
}

export function getDateMinutesDay(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
