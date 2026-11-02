// Dates in the YAML files have no time, so format in UTC to avoid showing the day before.
export function formatDate(date: Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return date.toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });
}

// Trips are short, so the end year is enough even when one crosses New Year.
export function formatRange(start: Date, end?: Date) {
  if (!end) return formatDate(start);
  return `${formatDate(start, { day: 'numeric', month: 'short' })} – ${formatDate(end)}`;
}
