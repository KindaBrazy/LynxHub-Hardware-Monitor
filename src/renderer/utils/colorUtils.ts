type ThresholdRange = {
  max: number;
  classes: string;
  gradient: string;
};

/**
 * Hardware temperature thresholds (Celsius).
 * Safely handles idle (green), moderate (amber), heavy load (orange), and critical limits (red).
 */
const TEMP_THRESHOLDS: ThresholdRange[] = [
  {
    max: 60,
    classes: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    gradient: 'from-emerald-400 to-emerald-500',
  },
  {max: 70, classes: 'text-amber-400 border-amber-400/30 bg-amber-400/10', gradient: 'from-amber-400 to-amber-500'},
  {
    max: 85,
    classes: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
    gradient: 'from-orange-400 to-orange-500',
  },
  {max: Infinity, classes: 'text-red-400 border-red-400/30 bg-red-400/10', gradient: 'from-red-400 to-red-500'},
];

/**
 * Hardware usage thresholds (0-100%).
 * Handles low (green), moderate (blue), heavy (amber), and near-capacity (red) utilization.
 */
const USAGE_THRESHOLDS: ThresholdRange[] = [
  {
    max: 30,
    classes: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    gradient: 'from-emerald-400 to-emerald-500',
  },
  {max: 60, classes: 'text-blue-400 border-blue-400/30 bg-blue-400/10', gradient: 'from-blue-400 to-blue-500'},
  {max: 85, classes: 'text-amber-400 border-amber-400/30 bg-amber-400/10', gradient: 'from-amber-400 to-amber-500'},
  {max: Infinity, classes: 'text-red-400 border-red-400/30 bg-red-400/10', gradient: 'from-red-400 to-red-500'},
];

/**
 * Returns a Tailwind CSS color class based on a PC hardware temperature value.
 * @param temp - The hardware temperature in Celsius.
 * @returns A string of Tailwind classes for text, border, and background color.
 */
export const getTemperatureColor = (temp: number): string => {
  return TEMP_THRESHOLDS.find(t => temp < t.max)!.classes;
};

/**
 * Returns a Tailwind CSS color class based on a usage percentage.
 * @param usage - The usage percentage (0-100).
 * @returns A string of Tailwind classes for text, border, and background color.
 */
export const getUsageColor = (usage: number): string => {
  return USAGE_THRESHOLDS.find(u => usage < u.max)!.classes;
};

/**
 * Returns Tailwind CSS gradient classes for the progress bar based on value.
 * @param value - The current value (temperature or percentage).
 * @param isTemp - A flag to indicate if the value is a temperature.
 * @returns A string of Tailwind classes for a background gradient.
 */
export const getProgressColor = (value: number, isTemp = false): string => {
  const dataset = isTemp ? TEMP_THRESHOLDS : USAGE_THRESHOLDS;
  return dataset.find(d => value < d.max)!.gradient;
};
