// Format a date to a human-readable string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Format date with time
export const formatDateWithTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

// Calculate the number of nights between two dates
export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const diffTime = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if a date is in the past
export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Add days to a date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Format date range
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};
