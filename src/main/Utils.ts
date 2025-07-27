import {ComponentType} from '@lynxhub/hwmonitor';

import {NewSystemMetrics} from '../cross/CrossTypes';

// Extracts component types that have enabled metrics from system metrics configuration
export function getActiveComponentTypes(metrics: NewSystemMetrics): ComponentType[] {
  const componentTypes: ComponentType[] = [];
  const processedComponents = new Set<ComponentType>();

  // Check CPU metrics
  if (metrics.cpu.some(item => item.enabled.length > 0) && !processedComponents.has('cpu')) {
    componentTypes.push('cpu');
    processedComponents.add('cpu');
  }

  // Check GPU metrics
  if (metrics.gpu.some(item => item.enabled.length > 0) && !processedComponents.has('gpu')) {
    componentTypes.push('gpu');
    processedComponents.add('gpu');
  }

  // Check Memory metrics
  if (metrics.memory.some(item => item.enabled.length > 0) && !processedComponents.has('memory')) {
    componentTypes.push('memory');
    processedComponents.add('memory');
  }

  // Check Uptime metrics
  if ((metrics.uptime.system || metrics.uptime.app) && !processedComponents.has('uptime')) {
    componentTypes.push('uptime');
    processedComponents.add('uptime');
  }

  return componentTypes;
}
