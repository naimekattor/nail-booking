"use client";

import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
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

const revenueData = [
  40000, 42000, 41000, 44000, 43000, 46000, 47000, 48000, 50000, 52000, 54000,
  56000,
];

const customerData = [80, 95, 100, 110, 115, 125, 130, 140, 145, 155, 165, 180];

// Build data object
const data = months.map((month, index) => ({
  month,
  revenue: revenueData[index],
  customers: customerData[index],
}));

export default function RevenueChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-2 font-semibold">Revenue Trend</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Monthly performance across all businesses
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#000000" />
          <YAxis yAxisId="right" orientation="right" stroke="#000000" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            barSize={30}
            fill="#82CA9D"
            radius={[4, 4, 0, 0]}
            name="Revenue ($)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="customers"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Customers"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
