"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const customerData = [80, 95, 100, 110, 115, 125, 130, 140, 145, 155, 165, 180];

const data = months.map((month, index) => ({
  month,
  customers: customerData[index],
}));

export default function CustomerGrowthChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-2 font-semibold">Customer Growth</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        New customer acquisition over time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorCustomers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
