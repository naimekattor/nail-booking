"use client";

import { useState } from "react";
import { Search, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  status: "active";
  customers: number;
  tradeNo: string;
}

const businesses: Business[] = [
  {
    id: "1",
    name: "Bella Beauty Salon",
    status: "active",
    customers: 1272,
    tradeNo: "254541879654",
  },
  {
    id: "2",
    name: "Luxury Spa & Wellness",
    status: "active",
    customers: 2138,
    tradeNo: "254541879654",
  },
  {
    id: "3",
    name: "Nail Art Studio",
    status: "active",
    customers: 934,
    tradeNo: "254541879654",
  },
  {
    id: "4",
    name: "Classic Barbershop",
    status: "active",
    customers: 1570,
    tradeNo: "254541879654",
  },
  {
    id: "5",
    name: "Zen Wellness Center",
    status: "active",
    customers: 2250,
    tradeNo: "254541879654",
  },
  {
    id: "6",
    name: "Glamour Palace",
    status: "active",
    customers: 1845,
    tradeNo: "254541879654",
  },
  {
    id: "7",
    name: "Serenity Spa",
    status: "active",
    customers: 2369,
    tradeNo: "254541879654",
  },
  {
    id: "8",
    name: "Perfect Nails",
    status: "active",
    customers: 1848,
    tradeNo: "254541879654",
  },
  {
    id: "9",
    name: "Modern Cuts",
    status: "active",
    customers: 1115,
    tradeNo: "254541879654",
  },
];

export default function BusinessSelection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">🏢</span>
              Total Businesses
            </div>
            <p className="mt-2 text-3xl font-bold">5,247</p>
            {/* <p className="mt-1 text-xs text-muted-foreground">
              25 on this page
            </p> */}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">$</span>
              Total Revenue (Approximate)
            </div>
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

        {/* Search & Filter Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Search & Filter Businesses</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Use advanced filters to find specific businesses across your
            platform
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by business name, owner or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="salon">Affliate</SelectItem>
                <SelectItem value="spa">Non aflliate</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled ">Cancelled </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Business Grid */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Select Business to View their customers
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Choose a business to access detailed customer insights and analytics
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h4 className="font-semibold">{business.name}</h4>
                  <Badge className="bg-[#DCFCE7] text-[#016630]">
                    {business.status}
                  </Badge>
                </div>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customers</span>
                    <span className="font-medium">
                      {business.customers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trade No.</span>
                    <span className="font-medium">{business.tradeNo}</span>
                  </div>
                </div>

                <Link href={`/super-admin/customers/${business.id}`}>
                  <Button
                    className="w-full gap-2 bg-transparent"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4" />
                    View Customers
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
