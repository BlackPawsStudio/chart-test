interface TooltipProps {
  color: string;
  value: number;
}

export const Tooltip = ({ color, value }: TooltipProps) => {
  return (
    <div className="border-1 h-24 w-36 rounded-md border-[#FFFFFF4D] bg-black text-white">
      <div className="flex h-full items-center gap-5 p-5">
        <div
          className="h-full min-w-1 rounded-lg"
          style={{ backgroundColor: color }}
        ></div>
        <div>
          <div className="text-xl font-bold">Delivered</div>
          <div className="text-lg text-[#E9F1FF79]">{value} emails</div>
        </div>
      </div>
    </div>
  );
};
