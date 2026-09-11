import {Checkbox, CheckboxGroup, Label} from '@heroui/react';
import {Activity, BarChart2, Eye, Type} from 'lucide-react';
import {memo, useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {hmonitorActions, useHMonitorState} from '../../state/hmonitorSlice';

const VISIBILITY_OPTIONS = [
  {
    value: 'icon',
    label: 'Sensor Icon',
    description: 'Hardware glyph indicator',
    Icon: Activity,
  },
  {
    value: 'label',
    label: 'Metric Label',
    description: 'Name or alias of the metric',
    Icon: Type,
  },
  {
    value: 'value',
    label: 'Numerical Value',
    description: 'Live sensor reading and unit',
    Icon: Eye,
  },
  {
    value: 'progressBar',
    label: 'Progress Bar',
    description: 'Dynamic gradient level bar',
    Icon: BarChart2,
  },
];

export const MetricVisibilitySettings = memo(() => {
  const metricVisibility = useHMonitorState('metricVisibility');
  const dispatch = useDispatch();

  const selectedValues = useMemo(() => {
    return Object.entries(metricVisibility)
      .filter(([, isVisible]) => isVisible)
      .map(([key]) => key);
  }, [metricVisibility]);

  const onValueChange = useCallback(
    (values: string[]) => {
      // Ensure at least one option is selected to avoid invisible metrics
      if (values.length < 1) return;

      dispatch(
        hmonitorActions.updateMetricVisibility({
          icon: values.includes('icon'),
          label: values.includes('label'),
          value: values.includes('value'),
          progressBar: values.includes('progressBar'),
        }),
      );
    },
    [dispatch],
  );

  return (
    <CheckboxGroup value={selectedValues} onChange={onValueChange} isInvalid={selectedValues.length === 0} isRequired>
      <div className="flex flex-col gap-1">
        <Label className="text-xs font-semibold text-foreground">Visible Metric Components</Label>
        <p className="text-xs text-muted">Select which components appear inside each individual metric badge</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {VISIBILITY_OPTIONS.map(({value, label, description, Icon}) => {
          const isSelected = selectedValues.includes(value);
          return (
            <Checkbox
              className={`p-3 rounded-3xl transition-all duration-200 cursor-pointer select-none ${
                isSelected ? 'bg-accent/10 border border-accent/60 shadow-xs' : 'bg-surface'
              }`}
              id={value}
              key={value}
              value={value}
              variant="secondary">
              <Checkbox.Content className="flex flex-col items-start gap-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`size-7 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-accent text-accent-foreground' : 'bg-surface-secondary text-muted'
                    }`}>
                    <Icon className="size-3.5" />
                  </div>
                  <Checkbox.Control className="size-4.5 rounded-full">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </div>
                <span className="text-xs font-semibold text-foreground mt-1">{label}</span>
                <span className="text-[10px] text-muted line-clamp-1">{description}</span>
              </Checkbox.Content>
            </Checkbox>
          );
        })}
      </div>
    </CheckboxGroup>
  );
});

MetricVisibilitySettings.displayName = 'MetricVisibilitySettings';
export default MetricVisibilitySettings;
