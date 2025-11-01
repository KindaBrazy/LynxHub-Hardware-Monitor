/**
 * Returns a Tailwind CSS color class based on a temperature value.
 * @param temp - The temperature in Celsius.
 * @returns A string of Tailwind classes for text, border, and background color.
 */
export const getTemperatureColor = (temp: number): string => {
  if (temp < 50) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  if (temp < 70) return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
  if (temp < 85) return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
  return 'text-red-400 border-red-400/30 bg-red-400/10';
};

/**
 * Returns a Tailwind CSS color class based on a usage percentage.
 * @param usage - The usage percentage (0-100).
 * @returns A string of Tailwind classes for text, border, and background color.
 */
export const getUsageColor = (usage: number): string => {
  if (usage < 30) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  if (usage < 60) return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
  if (usage < 85) return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
  return 'text-red-400 border-red-400/30 bg-red-400/10';
};

/**
 * Returns Tailwind CSS gradient classes for the progress bar based on value.
 * @param value - The current value (temperature or percentage).
 * @param isTemp - A flag to indicate if the value is a temperature.
 * @returns A string of Tailwind classes for a background gradient.
 */
export const getProgressColor = (value: number, isTemp = false): string => {
  const thresholds = isTemp ? {warn: 50, high: 70, crit: 85} : {warn: 30, high: 60, crit: 85};

  if (value < thresholds.warn) return 'from-emerald-400 to-emerald-500';
  if (value < thresholds.high) return isTemp ? 'from-amber-400 to-amber-500' : 'from-blue-400 to-blue-500';
  if (value < thresholds.crit) return 'from-amber-400 to-amber-500';
  return 'from-red-400 to-red-500';
};
