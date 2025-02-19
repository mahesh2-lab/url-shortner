"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  totalClicks: {
    label: "totalClicks",
  },
  mobile: {
    label: "Mobile",
  },
};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export function PieGraph({ data, loading }) {
  const id = "pie-interactive";
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Card data-chart={id} className="flex flex-col py-3">
      <CardHeader>
        <CardTitle className="text-2xl">Clicks by device</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <ChartStyle id={id} config={chartConfig} />
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="totalClicks"
              nameKey="deviceType"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="text-3xl font-bold text-white"
                        fill="white"
                      >
                        {data[activeIndex].totalClicks.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="text-white"
                        fill="white"
                      >
                        Visitors
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="mt-4">
          {data.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer rounded-md text-white flex items-center gap-x-16 capitalize justify-between transition-all duration-300 ${
                activeIndex === index ? "text-blue-500 " : "text-gray-700 "
              }`}
              onMouseOver={() => setActiveIndex(index)}
            >
              <p className="flex items-center gap-x-3">
                <Circle fill={item.fill} stroke="none" size={15} />{" "}
                {item.deviceType}
              </p>
              <p className="text-right">{item.totalClicks}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
