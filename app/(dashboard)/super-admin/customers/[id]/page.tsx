"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Search,
  MoreVertical,
  Star,
  Users,
} from "lucide-react";
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

interface Customer {
  id: string;
  name: string;
  email: string;
  badges: string[];
  joinedDate: string;
  lastVisit: string;
  spent: number;
  visits: number;
  rating: number;
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Anna Brown",
    email: "anna.brown39@email.com",
    badges: ["new", "platinum"],
    joinedDate: "Dec 21, 2023",
    lastVisit: "Jan 8, 2024",
    spent: 4912,
    visits: 21,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Anna Brown",
    email: "anna.brown139@email.com",
    badges: ["new", "platinum"],
    joinedDate: "Jun 8, 2023",
    lastVisit: "Jan 5, 2024",
    spent: 1606,
    visits: 25,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Anna Brown",
    email: "anna.brown239@email.com",
    badges: ["new", "platinum"],
    joinedDate: "Dec 8, 2023",
    lastVisit: "Jan 7, 2024",
    spent: 4207,
    visits: 50,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Anna Brown",
    email: "anna.brown339@email.com",
    badges: ["new", "platinum"],
    joinedDate: "Aug 27, 2023",
    lastVisit: "Jan 17, 2024",
    spent: 1247,
    visits: 36,
    rating: 4.1,
  },
];

export default function CustomerInsights() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Customer Insights</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Select a business to view detailed customer data and analytics
        </p>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              Total Customers
            </div>
            <p className="mt-2 text-3xl font-bold">1,108</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Showing 25 on this page
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">$</span>
              Total Revenue
            </div>
            <p className="mt-2 text-3xl font-bold">$76,826</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Business Owners
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">📊</span>
              Total Visits
            </div>
            <p className="mt-2 text-3xl font-bold">607</p>
            <p className="mt-1 text-xs text-muted-foreground">
              From displayed customers
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              Avg Rating
            </div>
            <p className="mt-2 text-3xl font-bold">4.4</p>
            <p className="mt-1 text-xs text-muted-foreground">
              From displayed customers
            </p>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Search & Filter Customers</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Find specific customers within Classic Barbershop
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email,"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-primary to-pink-600 text-primary-foreground hover:opacity-90">
              Company details
            </Button>
          </div>
        </div>

        {/* Customer Directory */}
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h3 className="font-semibold">Customer Directory (1108 total)</h3>
              <p className="text-sm text-muted-foreground">
                Showing 1-25of 1,108 customers
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Customer Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 hover:bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{customer.name}</span>
                      {customer.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="secondary"
                          className={
                            badge === "new"
                              ? "bg-primary/10 text-primary"
                              : "bg-purple-500/10 text-purple-500"
                          }
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {customer.joinedDate} · Last visit{" "}
                      {customer.lastVisit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="font-semibold">
                      ${customer.spent.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Visits</p>
                    <p className="font-semibold">{customer.visits}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{customer.rating}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border p-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-25of 1,108 customers
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                First
              </Button>
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
              <Button variant="outline" size="sm">
                Last
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
