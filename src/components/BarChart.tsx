import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { renderToString } from "~/utils";
import { Tooltip } from "./Tooltip";

interface BarChartComponentProps {
  className?: string;
  data: ({ date: string; value: number | null } | null)[];
}

export const BarChartComponent = ({
  className,
  data,
}: BarChartComponentProps) => {
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: data.map((d) => d?.date ?? ""),
      splitLine: {
        show: true,
        lineStyle: {
          type: [5, 5],
          dashOffset: 2,
          width: 1.2,
          color: "#FFFFFF4D",
        },
      },
      axisLabel: {
        padding: [10, 0, 0, 0],
      },
    },
    yAxis: {
      position: "right",
      max: 3,
      min: 0,
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: [5, 5],
          dashOffset: 2,
          width: 1.2,
          color: "#FFFFFF4D",
        },
      },
    },
    series: [
      {
        data: data.map((d) => (d?.value ? d.value : 0)),
        type: "bar",
        stack: "x",
        name: "run 1",
        color: "#6FD392",
        barWidth: 4.8,
      },
    ],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tooltip: {
      trigger: "item",
      formatter: (params: { data: number; color: string }) => {
        const value = params.data;
        const color = params.color;
        return renderToString(<Tooltip value={value} color={color} />);
      },
      padding: 0,
      borderRadius: 6,
      borderColor: "transparent",
      backgroundColor: "transparent",
    },
    grid: {
      bottom: 117,
      left: 0,
      right: 23,
      top: 5,
      containLabel: true,
    },
    legend: {
      left: 100,
      bottom: 21,
      icon: "roundRect",
      itemWidth: 20,
      itemHeight: 5,
      textStyle: {
        color: "white",
      },
    },
  };

  return (
    <div className={className}>
      <ReactECharts
        style={{
          width: "100%",
          height: "100%",
        }}
        option={option}
      ></ReactECharts>
    </div>
  );
};
