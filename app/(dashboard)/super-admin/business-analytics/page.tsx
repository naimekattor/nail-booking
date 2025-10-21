"use client";

import { TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TargetModal from "@/components/super-admin/modals/TargetModal";
import RevenueChart from "@/components/RevenueChart";
import CustomerGrowthChart from "@/components/CustomerGrowthChart";

export default function RevenueDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen ">
      <div className="mx-auto  space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <div>
            <h1 className="text-2xl font-semibold">Revenue Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track your business performance and growth
            </p>
          </div> */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#F2319F] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              {/* <Target className="mr-2 h-4 w-4" /> */}
              Target setup
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground">
              Total Subscriber
            </div>
            <p className="mt-2 text-3xl font-bold">5,247</p>
            {/* <p className="mt-1 text-xs text-muted-foreground">
              25 on this page
            </p> */}
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
          {/* Revenue Trend (Bar Chart) */}
          <RevenueChart />

          {/* Customer Growth (SVG Line Chart) */}
          <CustomerGrowthChart />
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
      <TargetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
