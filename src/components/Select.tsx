import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

interface SelectProps {
  className?: string;
  items: string[];
  selectedItem?: string;
  onSelect: (item: string) => void;
}

export const Select = ({
  items,
  onSelect,
  className,
  selectedItem,
}: SelectProps) => {
  const [item, setItem] = useState<string | null>(selectedItem ?? null);

  return (
    <Tabs>
      <TabsList
        className={`border-1 p- flex w-fit gap-x-2 rounded-lg border-[#8B8B8B4D] text-[#E9F1FF79] ${className}`}
      >
        {items.map((i, idx) => (
          <TabsTrigger
            value={i}
            key={idx}
            onClick={() => {
              setItem(i);
              onSelect(i);
            }}
            className={`hover:foreground cursor-pointer rounded-md px-3 py-1 text-xs text-white ${item === i ? "bg-[#DDEDFF26]" : "hover:bg-[#DDEDFF18]"}`}
          >
            {i}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
