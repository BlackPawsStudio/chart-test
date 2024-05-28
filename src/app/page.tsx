"use client";
import { Separator } from "@radix-ui/react-separator";
import { useMemo, useState } from "react";
import { BarChartComponent } from "~/components/BarChart";
import { Select } from "~/components/Select";
import { generateFormattedDates as generateFormattedData } from "~/utils";

export default function HomePage() {
  const [selectedD, setSelectedD] = useState<string>("7D");

  const formattedDates = useMemo(() => {
    const dataArray = generateFormattedData(4, 2024, [
      {
        day: 14,
        value: 2,
      },
      { day: 6, value: 3 },
    ]);
    switch (selectedD) {
      case "D":
        return dataArray.slice(0, 1);
      case "7D":
        return dataArray.slice(0, 7);
      case "15D":
        return dataArray.slice(0, 15);
      case "30D":
        return dataArray.slice(0, 30);
      default:
        return dataArray;
    }
  }, [selectedD]);

  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black">
      <div className="border-1 relative h-[571px] w-[1210px] rounded-lg border-[#FFFFFF4D] py-[21px]">
        <div className="flex justify-end px-[33px]">
          <Select
            items={["D", "7D", "15D", "30D"]}
            onSelect={setSelectedD}
            selectedItem={selectedD}
            className="mb-14"
          />
        </div>
        <BarChartComponent
          className="h-[460px] px-[33px]"
          data={formattedDates}
        />
        <Separator
          orientation="horizontal"
          className="absolute bottom-[75px] left-0 h-[0.8px] w-full bg-[#FFFFFF4D]"
        />
        <div className="absolute bottom-7 left-8 text-white">Data</div>
      </div>
    </main>
  );
}
