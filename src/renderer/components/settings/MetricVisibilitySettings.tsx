import {Checkbox, CheckboxGroup} from '@heroui/react';
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
    <CheckboxGroup
      color="primary"
      value={selectedValues}
      orientation="horizontal"
      label="Metric Visibility"
      onValueChange={onValueChange}
      isInvalid={selectedValues.length === 0}
      classNames={{label: 'text-foreground'}}
      isRequired>
      {VISIBILITY_OPTIONS.map(({value, label}) => (
        <Checkbox key={value} value={value}>
          {label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
