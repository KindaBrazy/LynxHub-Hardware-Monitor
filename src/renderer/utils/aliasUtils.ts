/**
 * Utility functions to get user-friendly aliases for various hardware devices.
 */

export const getCpuAlias = (_name: string): string => {
  return 'CPU';
};

export const getGpuAlias = (_name: string): string => {
  return 'GPU';
};

export const getMemoryAlias = (_name: string): string => {
  return 'RAM';
};

export const getNetworkAlias = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (
    lowerName.includes('wi-fi') ||
    lowerName.includes('wifi') ||
    lowerName.includes('wireless') ||
    lowerName.includes('wlan') ||
    lowerName.includes('802.11')
  ) {
    return 'Wi-Fi';
  }
  if (
    lowerName.includes('ethernet') ||
    lowerName.includes('lan') ||
    lowerName.includes('gigabit') ||
    lowerName.includes('realtek pcie')
  ) {
    return 'Ethernet';
  }
  return 'Ethernet/Wi-Fi';
};
