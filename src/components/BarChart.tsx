import { graphic, type EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { renderToString } from "~/utils";
import { Tooltip } from "./Tooltip";
import type { BarType } from "~/types";
import { useLayoutEffect, useRef } from "react";

interface BarChartComponentProps {
  className?: string;
  dates: (string | null)[];
  values: BarType[];
}

export const BarChartComponent = ({
  className,
  dates,
  values,
}: BarChartComponentProps) => {
  const chartRef = useRef<ReactECharts>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      const chart = chartRef.current?.getEchartsInstance();
      const width = (chart?.getWidth() ?? 0) - 50;
      chart?.setOption({
        graphic: {
          elements: [
            {
              type: "rect",
              left: 0,
              top: 0,
              z: 1,
              shape: {
                width,
                height: 323,
              },
              style: {
                fill: new graphic.RadialGradient(0.5, 0.5, 2, [
                  {
                    offset: 0,
                    color: "transparent",
                  },
                  {
                    offset: 1,
                    color: "#000",
                  },
                ]),
              },
            },
          ],
        },
      });

      if (!width) return;
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: dates.map((d) => d ?? ""),
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
        data: dates.map((d) => {
          if (!d) return 0;
          const value = values.find((v) => v.day === d && v?.group === "run 1");
          return value ? value.value : 0;
        }),
        type: "bar",
        stack: "x",
        name: "run 1",
        color: "#6FD392",
        barWidth: 4.8,
      },
      {
        data: dates.map((d) => {
          if (!d) return 0;
          const value = values.find((v) => v.day === d && v?.group === "run 2");
          return value ? value.value : 0;
        }),
        type: "bar",
        stack: "x",
        name: "run 2",
        color: "#00A3FF",
        barWidth: 4.8,
      },
    ],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tooltip: {
      trigger: "item",
      formatter: (params: { data: number; color: string }) => {
        console.log(option);
        const value = params.data;
        const color = params.color;
        return renderToString(<Tooltip value={value} color={color} />);
      },
      padding: 0,
      borderRadius: 6,
      borderColor: "transparent",
      backgroundColor: "transparent",
      z: 2,
    },
    grid: {
      bottom: 117,
      left: 0,
      right: 23,
      top: 5,
      z: 1,
      containLabel: true,
    },
    legend: {
      left: 100,
      bottom: 19,
      icon: "roundRect",
      itemWidth: 20,
      itemHeight: 5,
      textStyle: {
        color: "white",
        fontSize: 16,
      },
      itemGap: 35,
      z: 3,
    },
  };

  return (
    <div className={className}>
      <ReactECharts
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
        }}
        option={option}
      ></ReactECharts>
    </div>
  );
};
