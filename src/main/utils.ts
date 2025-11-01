import {ComponentType} from '@lynxhub/hwmonitor';

import {EnabledMetrics} from '../cross/types';

/**
 * Determines which hardware components need to be monitored based on the user's settings.
 * This prevents polling hardware that the user has disabled, saving system resources.
 * @param metrics - The current configuration for enabled metrics.
 * @returns An array of component types to be passed to the hardware monitoring library.
 */
export function getActiveComponentTypes(metrics: EnabledMetrics): ComponentType[] {
  const activeComponents = new Set<ComponentType>();

  if (metrics.cpu.some(c => c.active && c.enabled.length > 0)) {
    activeComponents.add('cpu');
  }
  if (metrics.gpu.some(g => g.active && g.enabled.length > 0)) {
    activeComponents.add('gpu');
  }
  if (metrics.memory.some(m => m.active && m.enabled.length > 0)) {
    activeComponents.add('memory');
  }
  if (metrics.uptime.system || metrics.uptime.app) {
    activeComponents.add('uptime');
  }

  return Array.from(activeComponents);
}
