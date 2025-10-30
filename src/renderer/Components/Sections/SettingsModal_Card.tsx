import {Card, CardBody, CardHeader, Switch} from '@heroui/react';
import {ReactNode} from 'react';

type Props = {
  onPress: () => void;
  onValueChange: (value: boolean) => void;
  isSelected: boolean;
  title: string;
  children: ReactNode;
};
export default function SettingsModal_Card({onPress, title, onValueChange, isSelected, children}: Props) {
  return (
    <Card as="div" className="!shadow-sm p-2" fullWidth>
      <CardHeader onClick={onPress} className="flex flex-row justify-between cursor-pointer">
        <p className="font-medium">{title}</p>
        <Switch isSelected={isSelected} onValueChange={onValueChange} />
      </CardHeader>
      <CardBody className="flex-row items-center">
        {!isSelected && <div className="absolute inset-0 bg-background/50 z-20 m-1 rounded-xl" />}
        {children}
      </CardBody>
    </Card>
  );
}
