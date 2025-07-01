export function formatWIBDateTime(value: Date | string): string {
  const date = new Date(value);

  // Ensure it's valid
  if (isNaN(date.getTime())) return 'Invalid Date';

  // Format full date-time in Asia/Jakarta timezone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(date);

  // Extract date and time parts separately
  const datePart = `${parts.find((p) => p.type === 'year')?.value}-${parts.find((p) => p.type === 'month')?.value}-${parts.find((p) => p.type === 'day')?.value}`;
  const timePart = `${parts.find((p) => p.type === 'hour')?.value}:${parts.find((p) => p.type === 'minute')?.value}:${parts.find((p) => p.type === 'second')?.value}`;

  return `${datePart} ${timePart} WIB`;
}
