"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  CardHeader,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  date: {
    label: "Date",
    color: "hsl(var(--chart-1))",
  },
  totalClicks: {
    label: "Total Clicks",
    color: "hsl(var(--chart-2))",
  },
};

export function GraphChart({data}) {

  
  return (
    <Card className="h-full bottom-2">
      <CardHeader>
        <CardTitle className="text-2xl">Clicks over time</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              right: 40,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              height={60}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />

            <YAxis
              dataKey="totalClicks"
              tickLine={false}
              axisLine={false}
              height={50}
              scale={"auto"}
              tickMargin={8}
              tickFormatter={(value) => value}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalClicks"
              type="linear"
              stroke="#4C51BF"
              strokeWidth={2}
              dot={{
                fill: "#4C51BF",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

