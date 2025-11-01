import {Card, CardBody, CardHeader, Switch} from '@heroui/react';
import {memo, ReactNode} from 'react';

type Props = {
  onToggle: () => void;
  isSelected: boolean;
  title: string;
  children: ReactNode;
};

function SettingsModalCard({onToggle, title, isSelected, children}: Props) {
  return (
    <Card as="div" className="!shadow-sm p-2" fullWidth>
      <CardHeader onClick={onToggle} className="flex flex-row justify-between cursor-pointer">
        <p className="font-medium">{title}</p>
        <Switch isSelected={isSelected} onValueChange={onToggle} />
      </CardHeader>
      <CardBody className="flex-row items-center relative">
        {/* Overlay to indicate that the controls are disabled */}
        {!isSelected && <div className="absolute inset-0 bg-background/50 z-20 m-1 rounded-xl" />}
        {children}
      </CardBody>
    </Card>
  );
}
export default memo(SettingsModalCard);
