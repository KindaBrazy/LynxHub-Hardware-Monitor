const getTemperatureColor = (temp: number) => {
  if (temp < 50) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  if (temp < 70) return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
  if (temp < 85) return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
  return 'text-red-400 border-red-400/30 bg-red-400/10';
};

const getUsageColor = (usage: number) => {
  if (usage < 30) return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  if (usage < 60) return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
  if (usage < 85) return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
  return 'text-red-400 border-red-400/30 bg-red-400/10';
};

const getProgressColor = (value: number, isTemp = false) => {
  const thresholds = isTemp ? [50, 70, 85] : [30, 60, 85];
  if (value < thresholds[0]) return 'from-emerald-400 to-emerald-500';
  if (value < thresholds[1]) return isTemp ? 'from-amber-400 to-amber-500' : 'from-blue-400 to-blue-500';
  if (value < thresholds[2]) return 'from-amber-400 to-amber-500';
  return 'from-red-400 to-red-500';
};

export {getProgressColor, getTemperatureColor, getUsageColor};
