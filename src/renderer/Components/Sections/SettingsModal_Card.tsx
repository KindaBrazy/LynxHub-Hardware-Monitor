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
    <Card
      as="div"
      className="border-1 border-foreground-100 pt-2 px-2 hover:border-foreground-200 transition-all duration-200 mt-4"
      fullWidth>
      <CardHeader onClick={onPress} className="flex flex-row justify-between cursor-pointer">
        <p className="font-medium">{title}</p>
        <Switch isSelected={isSelected} onValueChange={onValueChange} />
      </CardHeader>
      <CardBody className="flex-row items-center">{children}</CardBody>
    </Card>
  );
}
