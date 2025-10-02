"use client";

import { TrendingUp, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RevenueDashboard() {
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
  const customerData = [
    80, 95, 100, 110, 115, 125, 130, 140, 145, 155, 165, 180,
  ];

  const maxRevenue = Math.max(...revenueData);
  const maxCustomers = Math.max(...customerData);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Revenue Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track your business performance and growth
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Target className="mr-2 h-4 w-4" />
              Target setup
            </Button>
            <Button variant="outline" size="icon" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground">
              Total Businesses
            </div>
            <p className="mt-2 text-3xl font-bold">5,247</p>
            <p className="mt-1 text-xs text-muted-foreground">
              25 on this page
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground">Current Revenue</div>
            <p className="mt-2 text-3xl font-bold">$746,616</p>
            <p className="mt-1 text-xs text-muted-foreground">
              For month calculated
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-success" />
              Avg Growth (Revenue)
            </div>
            <p className="mt-2 text-3xl font-bold text-success">+7.7%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Comparison to last month
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-success" />
              Avg Growth (Customer)
            </div>
            <p className="mt-2 text-3xl font-bold text-success">+7.7%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Comparison to last month
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Trend */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 font-semibold">Revenue Trend</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Monthly performance across all businesses
            </p>

            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {revenueData.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t bg-success/80 transition-all hover:bg-success"
                      style={{ height: `${(value / maxRevenue) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {months[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Growth */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 font-semibold">Customer Growth</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Total customer acquisition over time
            </p>

            <div className="relative h-64">
              <svg
                className="h-full w-full"
                viewBox="0 0 400 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="customerGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(34, 197, 94)"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(34, 197, 94)"
                      stopOpacity="0.05"
                    />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${
                    200 - (customerData[0] / maxCustomers) * 180
                  } ${customerData
                    .map(
                      (value, index) =>
                        `L ${(index / (customerData.length - 1)) * 400} ${
                          200 - (value / maxCustomers) * 180
                        }`
                    )
                    .join(" ")} L 400 200 L 0 200 Z`}
                  fill="url(#customerGradient)"
                />
                <path
                  d={`M 0 ${
                    200 - (customerData[0] / maxCustomers) * 180
                  } ${customerData
                    .map(
                      (value, index) =>
                        `L ${(index / (customerData.length - 1)) * 400} ${
                          200 - (value / maxCustomers) * 180
                        }`
                    )
                    .join(" ")}`}
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
              </svg>
              <div className="mt-2 flex justify-between">
                {months.map((month, index) => (
                  <span key={index} className="text-xs text-muted-foreground">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Metrics */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Revenue Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Annual Revenue
                </span>
                <span className="font-semibold">$446,100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Average Monthly Revenue
                </span>
                <span className="font-semibold">$37,175</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Revenue Growth Rate
                </span>
                <span className="font-semibold text-success">+12.3%</span>
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Revenue Projections</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Next Month Forecast
                </span>
                <span className="font-semibold">$52,400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Q1 2025 Target
                </span>
                <span className="font-semibold">$165,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Annual Target
                </span>
                <span className="font-semibold">$600,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Monthly Target Achievement
                </span>
                <span className="rounded bg-success/10 px-2 py-1 text-sm font-semibold text-success">
                  76%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
