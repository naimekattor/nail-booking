"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  MoreVertical,
  Users,
  DollarSign,
  Clock,
  Receipt,
  TrendingUp,
  Percent,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddAffiliateModal } from "@/components/affiliate/add-affiliate-modal";
import { ApplyRateTimeModal } from "@/components/affiliate/apply-rate-time-modal";
import { ApplyAffiliateRuleModal } from "@/components/affiliate/apply-affiliate-rule-modal";
import { ShowReferralsModal } from "@/components/affiliate/show-referrals-modal";
type StatusFilterOption = "All" | AffiliateStatus;
type AffiliateStatus = "Active" | "Pending" | "Suspended";
type AffiliateRule = "Standard" | "VIP partner" | "Common" | "Medium";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  affiliateRule: AffiliateRule;
  status: AffiliateStatus;
  referrals: number;
  totalEarned: number;
  totalPaid: number;
  availablePayout: number;
  pendingPayout: number;
  conversionRate: number;
  joinDate: string;
}

const initialAffiliates: Affiliate[] = [
  {
    id: "1",
    name: "John Marketing Pro",
    email: "john@example.com",
    affiliateRule: "Standard",
    status: "Active",
    referrals: 145,
    totalEarned: 15750,
    totalPaid: 12000,
    availablePayout: 2300,
    pendingPayout: 450,
    conversionRate: 3.2,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Digital Agency",
    email: "sarah@agency.com",
    affiliateRule: "VIP partner",
    status: "Active",
    referrals: 89,
    totalEarned: 11400,
    totalPaid: 9300,
    availablePayout: 1500,
    pendingPayout: 600,
    conversionRate: 4.1,
    joinDate: "2024-01-10",
  },
  {
    id: "3",
    name: "Mike Tech Solutions",
    email: "mike@tech.com",
    affiliateRule: "Common",
    status: "Suspended",
    referrals: 67,
    totalEarned: 8900,
    totalPaid: 8900,
    availablePayout: 0,
    pendingPayout: 0,
    conversionRate: 2.8,
    joinDate: "2023-12-05",
  },
  {
    id: "4",
    name: "Lisa Content Creator",
    email: "lisa@content.com",
    affiliateRule: "Medium",
    status: "Pending",
    referrals: 12,
    totalEarned: 1200,
    totalPaid: 0,
    availablePayout: 400,
    pendingPayout: 800,
    conversionRate: 5.0,
    joinDate: "2024-01-18",
  },
];

export default function AffiliatesDashboard() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(initialAffiliates);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRateTimeModalOpen, setIsRateTimeModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isReferralsModalOpen, setIsReferralsModalOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(
    null
  );

  const filteredAffiliates = affiliates.filter((aff) => {
    const matchesStatus = statusFilter === "All" || aff.status === statusFilter;
    const matchesSearch =
      aff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aff.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalStats = {
    activeAffiliates: affiliates.filter((a) => a.status === "Active").length,
    totalEarned: affiliates.reduce((sum, a) => sum + a.totalEarned, 0),
    pendingApproval: affiliates.reduce((sum, a) => sum + a.pendingPayout, 0),
    totalPaid: affiliates.reduce((sum, a) => sum + a.totalPaid, 0),
    totalReferrals: affiliates.reduce((sum, a) => sum + a.referrals, 0),
    avgConversion:
      affiliates.reduce((sum, a) => sum + a.conversionRate, 0) /
      affiliates.length,
  };

  const handleDeactivate = (id: string) => {
    setAffiliates((prev) =>
      prev.map((aff) => (aff.id === id ? { ...aff, status: "Suspended" } : aff))
    );
  };

  const handleDelete = (id: string) => {
    setAffiliates((prev) => prev.filter((aff) => aff.id !== id));
  };

  const handleApplyRateTime = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsRateTimeModalOpen(true);
  };

  const handleApplyRule = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsRuleModalOpen(true);
  };

  const handleShowReferrals = (affiliate: Affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsReferralsModalOpen(true);
  };

  const getStatusColor = (status: AffiliateStatus) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Suspended":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getRuleColor = (rule: AffiliateRule) => {
    switch (rule) {
      case "Standard":
        return "bg-warning/10 text-warning border-success/20";
      case "VIP partner":
        return " bg-warning/10 text-warning border-primary/20";
      case "Common":
        return "bg-warning/10 text-warning border-warning/20";
      case "Medium":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg  p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Affiliates
                </p>
                <p className="text-2xl font-bold">
                  {totalStats.activeAffiliates}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-3">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">
                  NT$ {totalStats.totalEarned.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-3">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold">
                  NT$ {totalStats.pendingApproval.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg  p-3">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total paid</p>
                <p className="text-2xl font-bold">
                  NT$ {totalStats.totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg  p-3">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">
                  {totalStats.totalReferrals}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg  p-3">
                <Percent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Conversion</p>
                <p className="text-2xl font-bold">
                  {totalStats.avgConversion.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Affiliates</h2>
          <Button
            size="sm"
            className="gap-2 bg-[#F2319F] text-white hover:opacity-90"
            onClick={() => setIsAddModalOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            Add Affiliate
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-2">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search affiliates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <DropdownMenu>
            {/* The button that users click to open the dropdown */}
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span>
                  {statusFilter === "All" ? "All Status" : statusFilter}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            {/* The content of the dropdown menu */}
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Radio group to manage single selection */}
              <DropdownMenuGroup>
                {(
                  [
                    "All",
                    "Active",
                    "Pending",
                    "Suspended",
                  ] as StatusFilterOption[]
                ).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`
        cursor-pointer
        ${statusFilter === status ? "bg-accent text-accent-foreground" : ""}
      `}
                  >
                    {status === "All" ? "All Status" : status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              All Affiliate Partners ({filteredAffiliates.length})
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Affiliate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Affiliate Rule
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Referrals
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Total Earned
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Available Payout
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Conversion Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Join Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAffiliates.map((affiliate) => (
                  <tr
                    key={affiliate.id}
                    className="border-b border-border last:border-0 hover:bg-accent/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {affiliate.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {affiliate.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 ">
                      <Badge className={getRuleColor(affiliate.affiliateRule)}>
                        {affiliate.affiliateRule}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getStatusColor(affiliate.status)}>
                        {affiliate.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-primary">
                        {affiliate.referrals}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          NT$ {affiliate.totalEarned.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Paid: NT$ {affiliate.totalPaid.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-success">
                          NT$ {affiliate.availablePayout.toLocaleString()}
                        </span>
                        <span className="text-xs text-warning">
                          Pending: NT${" "}
                          {affiliate.pendingPayout.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-foreground">
                      {affiliate.conversionRate}%
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {affiliate.joinDate}
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem
                            onClick={() => handleApplyRule(affiliate)}
                          >
                            Apply Affiliate Rule
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeactivate(affiliate.id)}
                          >
                            Deactivate affiliation
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleApplyRateTime(affiliate)}
                          >
                            Apply rate and time
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleShowReferrals(affiliate)}
                          >
                            Show Referrals
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(affiliate.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            Delete Affiliation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddAffiliateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ApplyRateTimeModal
        isOpen={isRateTimeModalOpen}
        onClose={() => setIsRateTimeModalOpen(false)}
        affiliate={selectedAffiliate}
      />
      <ApplyAffiliateRuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        affiliate={selectedAffiliate}
      />
      <ShowReferralsModal
        isOpen={isReferralsModalOpen}
        onClose={() => setIsReferralsModalOpen(false)}
        affiliate={selectedAffiliate}
      />
    </div>
  );
}
