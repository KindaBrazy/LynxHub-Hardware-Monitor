import {ComponentType} from '@lynxhub/hwmonitor';

import {SystemMetrics} from '../cross/CrossTypes';

export function getComponentTypesFromSystemMetrics(metrics: SystemMetrics[]): ComponentType[] {
  const componentTypes: ComponentType[] = [];
  const processedComponents = new Set<ComponentType>();

  metrics.forEach(metric => {
    let component: ComponentType | null = null;
    switch (metric) {
      case 'cpuTemp':
      case 'cpuUsage':
        component = 'cpu';
        break;
      case 'gpuTemp':
      case 'gpuUsage':
        component = 'gpu';
        break;
      case 'memory':
        component = 'memory';
        break;
      case 'uptimeSystemSeconds':
      case 'uptimeSeconds':
        component = 'uptime';
        break;
    }

    if (component && !processedComponents.has(component)) {
      componentTypes.push(component);
      processedComponents.add(component);
    }
  });

  return componentTypes;
}
