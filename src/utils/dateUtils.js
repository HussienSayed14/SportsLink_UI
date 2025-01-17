/**
 * Formats a timestamp to a user-friendly date string.
 *
 * @param {string} timestamp - The timestamp to format (e.g., "2025-01-17T22:22:31.565103").
 * @returns {string} - The formatted date (e.g., "Jan 17, 2025, 10:22 PM").
 */
export const formatTimestamp = (timestamp) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp));
};
