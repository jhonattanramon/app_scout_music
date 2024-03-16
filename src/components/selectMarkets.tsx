import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SelectMarkets({
  markets,
  getValue,
  value
}: {
  markets: string[];
  value: string
  getValue: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={(value) => getValue(value)}>

      <SelectTrigger>
        <SelectValue placeholder="markets" />
      </SelectTrigger>
      
      <SelectContent>
        {markets.map((market, index) => (
          <SelectItem value={market} key={index}>
            {market}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
