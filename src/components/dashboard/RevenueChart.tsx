"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RevenueData } from "@/types/dashboard";

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />

          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
            labelStyle={{
              fontWeight: 600,
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="currentColor"
            className="text-blue-600"
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}