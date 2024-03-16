import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function PickupLimit({
  getValue,
  value
}: {
  getValue: (value: string) => void;
  value: string
}) {
  const numbers = [];
  for (let index = 1; index <= 100; index++) {
    numbers.push(index);
  }
  return (
    <Select 
    value={value}
    onValueChange={(value) => getValue(value)}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {numbers.map((number, index) => (
          <SelectItem value={`${number}`} key={index}>
            {number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
