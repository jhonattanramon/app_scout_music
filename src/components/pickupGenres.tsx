import { HTMLAttributes } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface PickupGenresProps   {
  genres: string[];
  getValues: (values: string[]) => void;
  value: string[]
}

export default function PickupGenres({
    genres,
    value,
    getValues,
  }: PickupGenresProps) {
    return (
      <ScrollArea 
      className="flex flex-1 h-28 w-full">
        <ToggleGroup
          value={value}
          onValueChange={(values:any) => getValues(values)}
          variant={"default"}
          type="multiple"
          className="flex flex-wrap w-full"
        >
          {genres.map((genre, index) => (
            <ToggleGroupItem
              key={index}
              value={genre}
              className="capitalize w-full"
            >
              {genre}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </ScrollArea>
    );
  }