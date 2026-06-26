"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ data }: any) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 p-5 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-400 opacity-20 blur-3xl rounded-full" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#28170D]">
            Revenue Overview
          </h2>
          <p className="text-xs text-gray-500">
            Last 12 months revenue performance
          </p>
        </div>

        <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
          Live
        </span>
      </div>

      {/* Scrollable Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px] h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.25}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
              />

              <Tooltip
                formatter={(value: any) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #eee",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}