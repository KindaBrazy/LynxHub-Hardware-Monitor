import {Checkbox, CheckboxGroup, Label} from '@heroui/react';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {hmonitorActions, useHMonitorState} from '../../state/hmonitorSlice';

const VISIBILITY_OPTIONS = [
  {value: 'icon', label: 'Icon'},
  {value: 'label', label: 'Label'},
  {value: 'value', label: 'Value'},
  {value: 'progressBar', label: 'Progress Bar'},
];

export default function MetricVisibilitySettings() {
  const metricVisibility = useHMonitorState('metricVisibility');
  const dispatch = useDispatch();

  const selectedValues = useMemo(() => {
    return Object.entries(metricVisibility)
      .filter(([, isVisible]) => isVisible)
      .map(([key]) => key);
  }, [metricVisibility]);

  const onValueChange = useCallback(
    (values: string[]) => {
      // Ensure at least one option is selected
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
      <Label>Metric Visibility</Label>
      <div className="flex flex-row gap-x-4">
        {VISIBILITY_OPTIONS.map(({value, label}) => (
          <Checkbox id={value} key={value} value={value} className="mt-2">
            <Checkbox.Content>
              <Checkbox.Control className="size-5 rounded-lg before:rounded-lg">
                <Checkbox.Indicator />
              </Checkbox.Control>
              {label}
            </Checkbox.Content>
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  );
}
