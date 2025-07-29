import {Checkbox, CheckboxGroup} from '@heroui/react';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {systemMonitorActions, useSystemMonitorState} from '../reducer';

export default function Settings_MetricVisibility() {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<string[]>(['icon', 'label', 'value', 'progress-bar']);
  const [selected, setSelected] = useState<string[]>([]);

  const metricVisibility = useSystemMonitorState('metricVisibility');
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedResult: string[] = [];
    if (metricVisibility.icon) selectedResult.push('icon');
    if (metricVisibility.label) selectedResult.push('label');
    if (metricVisibility.value) selectedResult.push('value');
    if (metricVisibility.progressBar) selectedResult.push('progress-bar');
    setSelected(selectedResult);
    setDefaultValues(selectedResult);
  }, [metricVisibility]);

  const onValueChange = useCallback((value: string[]) => {
    if (value.length < 1) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      dispatch(
        systemMonitorActions.updateMetricVisibility({
          icon: value.includes('icon'),
          label: value.includes('label'),
          value: value.includes('value'),
          progressBar: value.includes('progress-bar'),
        }),
      );
    }
  }, []);

  return (
    <CheckboxGroup
      color="primary"
      value={selected}
      isInvalid={isInvalid}
      orientation="horizontal"
      defaultValue={defaultValues}
      onValueChange={onValueChange}
      label="Choose Metric Visibility"
      description="Select which elements to display for metrics in the status bar."
      isRequired>
      <Checkbox value="icon">Icon</Checkbox>
      <Checkbox value="label">Label</Checkbox>
      <Checkbox value="value">Value</Checkbox>
      <Checkbox value="progress-bar">Process Bar</Checkbox>
    </CheckboxGroup>
  );
}
