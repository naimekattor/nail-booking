"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AuditLog {
  id: string;
  time: string;
  user: string;
  role: string;
  event: string;
  eventType: string;
  eventIcon: string;
  description: string;
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [logs] = useState<AuditLog[]>([
    {
      id: "1",
      time: "25/01/2024\n18:30:00",
      user: "admin@company.com",
      role: "Admin",
      event: "Updated commission rate",
      eventType: "affiliate",
      eventIcon: "💰",
      description: "Commission rate increased for affiliate sarah_johns...",
    },
    {
      id: "2",
      time: "25/01/2024\n15:15:00",
      user: "finance@company.com",
      role: "Finance Manager",
      event: "Processed refund",
      eventType: "invoice",
      eventIcon: "🧾",
      description: "Full refund processed for Acme Corp invoice INV-...",
    },
    {
      id: "3",
      time: "24/01/2024\n20:45:00",
      user: "admin@company.com",
      role: "Admin",
      event: "Manual commission adjustment",
      eventType: "commission",
      eventIcon: "⚙️",
      description: "Manual adjustment: +$250 bonus commission for...",
    },
    {
      id: "4",
      time: "24/01/2024\n20:20:00",
      user: "system",
      role: "System",
      event: "Generated payout",
      eventType: "payout",
      eventIcon: "📄",
      description: "Monthly payout generated for 12 affiliates totalin...",
    },
    {
      id: "5",
      time: "23/01/2024\n17:30:00",
      user: "admin@company.com",
      role: "Admin",
      event: "Voided payout",
      eventType: "payout",
      eventIcon: "⚠️",
      description: "Payout voided due to calculation errors",
    },
    {
      id: "6",
      time: "22/01/2024\n15:30:00",
      user: "admin@company.com",
      role: "Admin",
      event: "Updated payment gateway keys",
      eventType: "gateway",
      eventIcon: "🔑",
      description: "Stripe API keys rotated for security compliance",
    },
    {
      id: "7",
      time: "21/01/2024\n21:10:00",
      user: "admin@company.com",
      role: "Admin",
      event: "Permission change",
      eventType: "user",
      eventIcon: "👤",
      description: "User john.doe@company.com promoted to Finan...",
    },
    {
      id: "8",
      time: "20/01/2024\n18:30:00",
      user: "billing-system",
      role: "System",
      event: "Failed payment processing",
      eventType: "subscription",
      eventIcon: "💳",
      description: "Payment failed for TechStart Inc subscription - car...",
    },
  ]);

  const getEventColor = (eventType: string) => {
    const colors: Record<string, string> = {
      affiliate: "text-yellow-500",
      invoice: "text-pink-500",
      commission: "text-blue-500",
      payout: "text-green-500",
      gateway: "text-purple-500",
      user: "text-orange-500",
      subscription: "text-cyan-500",
    };
    return colors[eventType] || "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Advanced Filters</span>
        </div>

        {/* Search and Filters */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                variant="outline"
                className="justify-start lg:w-auto bg-transparent"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter each person
              </Button>

              <div className="flex gap-2">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-[150px]"
                  />
                  <span className="absolute -top-2 left-2 bg-card px-1 text-xs text-muted-foreground">
                    From Date
                  </span>
                </div>

                <div className="relative">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-[150px]"
                  />
                  <span className="absolute -top-2 left-2 bg-card px-1 text-xs text-muted-foreground">
                    To Date
                  </span>
                </div>

                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-black/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Time
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      User
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Event
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Description
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 text-sm text-muted-foreground whitespace-pre-line">
                        {log.time}
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">{log.user}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.role}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{log.eventIcon}</span>
                          <div>
                            <p
                              className={`text-sm font-medium ${getEventColor(
                                log.eventType
                              )}`}
                            >
                              {log.event}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {log.eventType}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{log.description}</td>
                      <td className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export Log</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page
                </span>
                <select className="rounded border border-border bg-background px-2 py-1 text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Page 1 of 1 (8 total records)
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
