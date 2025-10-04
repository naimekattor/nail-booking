"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Download,
  Search,
  UserPlus,
  MoreVertical,
  FileText,
  Pause,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceModal } from "@/components/super-admin/SubscriberPage/invoice-modal";
import { InviteModal } from "@/components/super-admin/SubscriberPage/invite-modal";

type StatusType = "Active" | "Hold" | "Paused" | "Cancelled" | "Affiliate";
type PlanType = "Pro" | "Trial";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  status: StatusType;
  transactionId: string;
  paymentInfo: {
    method: string;
    last4: string;
    expiry: string;
  };
  firstSubscription: string;
  lastPayment: string;
  nextBilling: string;
  totalRevenue: number;
  affiliates: string;
  merchantTrade: string;
}

const initialSubscribers: Subscriber[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "billing@acme.com",
    plan: "Pro",
    status: "Active",
    transactionId: "MD24015001",
    paymentInfo: { method: "Chase Bank", last4: "3242", expiry: "12/26" },
    firstSubscription: "2024-01-15",
    lastPayment: "2024-01-15",
    nextBilling: "2024-02-15",
    totalRevenue: 48500,
    affiliates: "Active",
    merchantTrade: "123456",
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "admin@techstart.io",
    plan: "Trial",
    status: "Hold",
    transactionId: "MD24020002",
    paymentInfo: { method: "Bank of America", last4: "5678", expiry: "08/25" },
    firstSubscription: "2024-02-20",
    lastPayment: "2024-02-20",
    nextBilling: "2024-03-05",
    totalRevenue: 12600,
    affiliates: "-",
    merchantTrade: "123456",
  },
  {
    id: "3",
    name: "Global Solutions",
    email: "finance@globalsol.com",
    plan: "Pro",
    status: "Hold",
    transactionId: "MD23110003",
    paymentInfo: { method: "Wells Fargo", last4: "9012", expiry: "03/24" },
    firstSubscription: "2023-11-10",
    lastPayment: "2023-12-10",
    nextBilling: "N/A",
    totalRevenue: 89200,
    affiliates: "Active",
    merchantTrade: "123456",
  },
  {
    id: "4",
    name: "StartupXY",
    email: "ceo@startupxy.com",
    plan: "Trial",
    status: "Active",
    transactionId: "N/A",
    paymentInfo: { method: "Citibank", last4: "3456", expiry: "06/27" },
    firstSubscription: "N/A",
    lastPayment: "N/A",
    nextBilling: "2024-02-08",
    totalRevenue: 0,
    affiliates: "-",
    merchantTrade: "123456",
  },
  {
    id: "5",
    name: "Beta Tester Co",
    email: "beta@tester.com",
    plan: "Pro",
    status: "Hold",
    transactionId: "N/A",
    paymentInfo: { method: "No payment info", last4: "", expiry: "" },
    firstSubscription: "2024-01-01",
    lastPayment: "N/A",
    nextBilling: "N/A",
    totalRevenue: 0,
    affiliates: "-",
    merchantTrade: "123456",
  },
  {
    id: "6",
    name: "Enterprise Corp",
    email: "billing@enterprise.com",
    plan: "Trial",
    status: "Active",
    transactionId: "MD23061500",
    paymentInfo: { method: "Wells Fargo", last4: "7890", expiry: "06/28" },
    firstSubscription: "2023-06-15",
    lastPayment: "2024-01-15",
    nextBilling: "N/A",
    totalRevenue: 25400,
    affiliates: "Active",
    merchantTrade: "123456",
  },
];

export default function SubscriberPage() {
  const [subscribers, setSubscribers] =
    useState<Subscriber[]>(initialSubscribers);
  const [activeTab, setActiveTab] = useState<"All" | StatusType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesTab = activeTab === "All" || sub.status === activeTab;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setSubscribers((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
  };

  const handleDelete = (id: string) => {
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleInvoiceClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsInvoiceModalOpen(true);
  };

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Hold":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Paused":
        return "bg-warning/10 text-warning border-warning/20";
      case "Cancelled":
        return "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20";
      case "Affiliate":
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getPlanColor = (plan: PlanType) => {
    return plan === "Pro"
      ? "bg-foreground text-background"
      : "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Status</h1>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs Section */}
          <div className="flex flex-row gap-2">
            {(
              ["All", "Active", "Paused", "Cancelled", "Affiliate"] as const
            ).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "bg-[#F2319F] text-primary-foreground"
                    : "bg-white border text-foreground hover:bg-gray-50"
                }
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Separator for lg screens */}
          <div className="hidden lg:block h-[0.5px] w-full bg-[#D7D7D7]" />

          {/* Export + Invite Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-[#F2319F] text-primary-foreground hover:opacity-90"
              onClick={() => setIsInviteModalOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              Invite
            </Button>
          </div>

          {/* Separator for lg screens */}
          <div className="hidden lg:block h-[0.5px] w-full bg-[#D7D7D7]" />

          {/* Search Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full lg:w-auto">
            <span className="text-sm text-muted-foreground">
              Subscribers
              {/* <span className="font-semibold">{filteredSubscribers.length}</span> */}
            </span>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Payment Info
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  First Subscription
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Last Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Next Billing
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Total Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Affiliates
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Merchant trade
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="border-b border-border last:border-0 hover:bg-accent/50"
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {subscriber.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {subscriber.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={getPlanColor(subscriber.plan)}>
                      {subscriber.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={getStatusColor(subscriber.status)}>
                      {subscriber.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.transactionId}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-foreground">
                        {subscriber.paymentInfo.method}
                      </span>
                      {subscriber.paymentInfo.last4 && (
                        <>
                          <span className="text-xs text-muted-foreground">
                            •••• •••• •••• {subscriber.paymentInfo.last4}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Exp: {subscriber.paymentInfo.expiry}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.firstSubscription}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.lastPayment}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.nextBilling}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-foreground">
                    ${subscriber.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.affiliates}
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    {subscriber.merchantTrade}
                  </td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => handleInvoiceClick(subscriber)}
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(subscriber.id, "Hold")
                          }
                          className="gap-2"
                        >
                          <Pause className="h-4 w-4" />
                          Hold
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(subscriber.id)}
                          className="gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page 1 of 1 (6 total records)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        subscriber={selectedSubscriber}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
