"use client";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { BarChartComponent } from "~/components/BarChart";
import { Select } from "~/components/Select";

export default function HomePage() {
  const [selectedD, setSelectedD] = useState<string>('7D');

  return (
    <main className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black">
      <div className="relative border-1 h-[571px] w-[1210px] rounded-lg border-[#FFFFFF4D] py-[21px]">
        <div className="flex justify-end px-[33px]">
          <Select
            items={["D", "7D"]}
            onSelect={setSelectedD}
            selectedItem={selectedD}
            className="mb-14"
          />
        </div>
        <BarChartComponent className="h-[460px] px-[33px]" />
        <Separator
          orientation="horizontal"
          className="absolute bottom-[75px] left-0 h-[0.8px] w-full bg-[#FFFFFF4D]"
        />
        <div className="text-white absolute left-8 bottom-7">Data</div>
      </div>
    </main>
  );
}
