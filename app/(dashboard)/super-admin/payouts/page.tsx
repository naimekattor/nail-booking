"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  MoreVertical,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Withdrawal {
  id: string;
  affiliate: string;
  email: string;
  grossAmount: string;
  tax: string;
  fees: string;
  netAmount: string;
  rate: string;
  commission: string;
  status: "pending" | "approved" | "paid" | "reject";
}

export default function WithdrawalsList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isTaxFeeOpen, setIsTaxFeeOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [taxFeeData, setTaxFeeData] = useState({ tax: "", fee: "" });

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      id: "1",
      affiliate: "John Marketing Pro",
      email: "customer7@example.com",
      grossAmount: "NT$ 10,000",
      tax: "Tax: 5%",
      fees: "Fees: 2.75%",
      netAmount: "NT$ 9,250",
      rate: "10%",
      commission: "NT$ 925",
      status: "pending",
    },
    {
      id: "2",
      affiliate: "Sarah Digital Agency",
      email: "customer2@example.com",
      grossAmount: "NT$ 15,000",
      tax: "Tax: 5%",
      fees: "Fees: 2.75%",
      netAmount: "NT$ 13,875",
      rate: "15%",
      commission: "NT$ 2,081",
      status: "approved",
    },
    {
      id: "3",
      affiliate: "John Marketing Pro",
      email: "customer@example.com",
      grossAmount: "NT$ 25,000",
      tax: "Tax: 5%",
      fees: "Fees: 2.75%",
      netAmount: "NT$ 23,125",
      rate: "10%",
      commission: "NT$ 2,313",
      status: "paid",
    },
    {
      id: "4",
      affiliate: "John Marketing Pro",
      email: "customer@example.com",
      grossAmount: "NT$ 25,000",
      tax: "Tax: 5%",
      fees: "Fees: 2.5%",
      netAmount: "NT$ 23,125",
      rate: "10%",
      commission: "NT$ 2,313",
      status: "reject",
    },
  ]);

  const handleApprove = (id: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === id ? { ...w, status: "approved" as const } : w
      )
    );
    toast({
      title: "Withdrawal Approved",
      description: "The withdrawal request has been approved.",
    });
  };

  const handleReject = (id: string) => {
    setWithdrawals(
      withdrawals.map((w) =>
        w.id === id ? { ...w, status: "reject" as const } : w
      )
    );
    toast({
      title: "Withdrawal Rejected",
      description: "The withdrawal request has been rejected.",
    });
  };

  const handleSetTaxFee = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsTaxFeeOpen(true);
  };

  const handleSaveTaxFee = () => {
    if (!selectedWithdrawal) return;

    toast({
      title: "Tax & Fee Updated",
      description: "Tax and fee settings have been updated.",
    });
    setIsTaxFeeOpen(false);
    setTaxFeeData({ tax: "", fee: "" });
  };

  const handleDelete = (id: string) => {
    setWithdrawals(withdrawals.filter((w) => w.id !== id));
    toast({
      title: "Withdrawal Deleted",
      description: "The withdrawal request has been removed.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            Approved
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Paid
          </Badge>
        );
      case "reject":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            Reject
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Commissions
                  </p>
                  <p className="text-2xl font-bold">NT$ 5,319</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">NT$ 925</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">NT$ 2,081</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="text-2xl font-bold">NT$ 2,313</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search commissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              All Type
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Withdrawals Table */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">All withdrawals list</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Affiliate
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Gross Amount
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Tax & Fees
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Net Amount
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Rate
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Commission
                    </th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr
                      key={withdrawal.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {withdrawal.affiliate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {withdrawal.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{withdrawal.grossAmount}</td>
                      <td className="py-4">
                        <div className="text-xs">
                          <p className="text-red-500">{withdrawal.tax}</p>
                          <p className="text-muted-foreground">
                            {withdrawal.fees}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-medium text-blue-500">
                        {withdrawal.netAmount}
                      </td>
                      <td className="py-4 text-sm">{withdrawal.rate}</td>
                      <td className="py-4 text-sm font-medium text-green-500">
                        {withdrawal.commission}
                      </td>
                      <td className="py-4">
                        {getStatusBadge(withdrawal.status)}
                      </td>
                      <td className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleApprove(withdrawal.id)}
                            >
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(withdrawal.id)}
                            >
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSetTaxFee(withdrawal)}
                            >
                              Set Tax and fee
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(withdrawal.id)}
                              className="text-red-500"
                            >
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
          </CardContent>
        </Card>
      </div>

      {/* Set Tax & Fee Modal */}
      <Dialog open={isTaxFeeOpen} onOpenChange={setIsTaxFeeOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Set Tax and Fee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                placeholder="5"
                value={taxFeeData.tax}
                onChange={(e) =>
                  setTaxFeeData({ ...taxFeeData, tax: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee-rate">Fee Rate (%)</Label>
              <Input
                id="fee-rate"
                placeholder="2.75"
                value={taxFeeData.fee}
                onChange={(e) =>
                  setTaxFeeData({ ...taxFeeData, fee: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaxFeeOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTaxFee}
              className="bg-black text-white hover:bg-black/90"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
