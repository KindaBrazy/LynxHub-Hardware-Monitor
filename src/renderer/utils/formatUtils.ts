/**
 * Formats a duration in seconds into a human-readable string (e.g., "5d 4h", "3h 2m", "15m").
 * @param totalSeconds - The duration in seconds.
 * @returns A formatted string representing the uptime.
 */
export const formatUptime = (totalSeconds: number): string => {
  if (totalSeconds < 60) return '0m';

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
