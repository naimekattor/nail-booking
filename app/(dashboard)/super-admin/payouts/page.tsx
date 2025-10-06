"use client";

import { useState, useMemo, useCallback } from "react";
import {
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  Upload,
  MoreHorizontal,
  Check,
  XCircle, // Icon for Reject
  Trash2, // Icon for Delete
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- 1. Data Structure & Initial Data ---
type WithdrawalStatus = "Pending" | "Approved" | "Paid" | "Reject";
type Withdrawal = {
  id: string;
  affiliateName: string;
  affiliateEmail: string;
  grossAmount: number;
  rate: number;
  netAmount: number;
  commission: number;
  withdrawal: number;
  status: WithdrawalStatus;
};

const initialWithdrawalsData: Withdrawal[] = [
  {
    id: "wd-001",
    affiliateName: "John Marketing Pro",
    affiliateEmail: "customer1@example.com",
    grossAmount: 10000,
    rate: 10,
    netAmount: 9250,
    commission: 925,
    withdrawal: 100,
    status: "Pending",
  },
  {
    id: "wd-002",
    affiliateName: "Sarah Digital Agency",
    affiliateEmail: "customer2@example.com",
    grossAmount: 15000,
    rate: 15,
    netAmount: 13875,
    commission: 2081,
    withdrawal: 200,
    status: "Approved",
  },
  {
    id: "wd-003",
    affiliateName: "John Marketing Pro",
    affiliateEmail: "customer3@example.com",
    grossAmount: 25000,
    rate: 10,
    netAmount: 23125,
    commission: 2313,
    withdrawal: 400,
    status: "Paid",
  },
  {
    id: "wd-004",
    affiliateName: "John Marketing Pro",
    affiliateEmail: "customer3@example.com",
    grossAmount: 25000,
    rate: 10,
    netAmount: 23125,
    commission: 2313,
    withdrawal: 500,
    status: "Reject",
  },
];

// --- 2. Helper Components & Functions (Unchanged) ---
const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
  <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        bgColor
      )}
    >
      <Icon className={cn("h-5 w-5", color)} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800">{`NT$ ${value.toLocaleString()}`}</p>
    </div>
  </div>
);
const getStatusBadgeClasses = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-blue-100 text-blue-800";
    case "paid":
      return "bg-green-100 text-green-800";
    case "reject":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// --- 3. Main Dashboard Component ---
export default function WithdrawalsDashboard() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(
    initialWithdrawalsData
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Type");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredWithdrawals = useMemo(
    () =>
      withdrawals.filter(
        (w) =>
          (statusFilter === "All Type" || w.status === statusFilter) &&
          (w.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.affiliateEmail.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [searchTerm, statusFilter, withdrawals]
  );

  // --- SINGLE & BULK ACTION HANDLERS ---
  const handleAction = useCallback(
    (ids: string[], action: "Approve" | "Paid" | "Reject" | "Delete") => {
      if (action === "Delete") {
        if (
          !window.confirm(
            `Are you sure you want to delete ${ids.length} item(s)? This action cannot be undone.`
          )
        ) {
          return;
        }
        setWithdrawals((current) => current.filter((w) => !ids.includes(w.id)));
      } else {
        setWithdrawals((current) =>
          current.map((w) =>
            ids.includes(w.id)
              ? { ...w, status: action as WithdrawalStatus }
              : w
          )
        );
      }
      setSelectedRows([]); // Always clear selection after an action
    },
    []
  );

  // --- SELECTION LOGIC ---
  const handleSelectAll = (checked: boolean) =>
    setSelectedRows(checked ? filteredWithdrawals.map((w) => w.id) : []);
  const handleSelectRow = (id: string, checked: boolean) =>
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  const isAllSelected =
    selectedRows.length === filteredWithdrawals.length &&
    filteredWithdrawals.length > 0;

  return (
    <div className="min-h-screen ">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={DollarSign}
            title="Total Commissions"
            value={5319}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            icon={Clock}
            title="Pending"
            value={925}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatCard
            icon={CheckCircle}
            title="Approved"
            value={2081}
            color="text-sky-600"
            bgColor="bg-sky-100"
          />
          <StatCard
            icon={TrendingUp}
            title="Paid"
            value={2313}
            color="text-green-600"
            bgColor="bg-green-100"
          />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm md:flex-row">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search commissions..."
              className="w-full rounded-md bg-gray-50 pl-9 md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between md:w-40"
              >
                {statusFilter} <Filter className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["All Type", "Pending", "Approved", "Paid", "Reject"].map(
                (status) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={() => setStatusFilter(status)}
                  >
                    {status}
                    {statusFilter === status && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-6 rounded-lg border bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                All withdrawals list
              </h3>
              <p className="text-sm text-gray-500">
                Selected ({selectedRows.length.toString().padStart(2, "0")})
              </p>
            </div>
            {/* --- NEW: CONDITIONAL BULK ACTION BUTTONS --- */}
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(selectedRows, "Reject")}
                >
                  <XCircle className="mr-2 h-4 w-4" /> Reject (
                  {selectedRows.length})
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleAction(selectedRows, "Delete")}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete (
                  {selectedRows.length})
                </Button>
              </div>
            ) : (
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            )}
          </div>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-t bg-gray-50">
                  <TableHead className="w-12 px-4">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Gross Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Withdrawal</TableHead>
                  <TableHead>Request status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdrawals.map((item) => (
                  <TableRow
                    key={item.id}
                    data-state={selectedRows.includes(item.id) && "selected"}
                  >
                    <TableCell className="px-4">
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(item.id, !!checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.affiliateName}</div>
                      <div className="text-xs text-gray-500">
                        {item.affiliateEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      NT$ {item.grossAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{item.rate}%</TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      NT$ {item.netAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      NT$ {item.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      NT$ {item.withdrawal.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border-none text-xs font-semibold",
                          getStatusBadgeClasses(item.status)
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {item.status === "Pending" && (
                            <DropdownMenuItem
                              onSelect={() =>
                                handleAction([item.id], "Approve")
                              }
                            >
                              Approve
                            </DropdownMenuItem>
                          )}
                          {item.status === "Approved" && (
                            <DropdownMenuItem
                              onSelect={() => handleAction([item.id], "Paid")}
                            >
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                          {(item.status === "Pending" ||
                            item.status === "Approved") && (
                            <DropdownMenuItem
                              className="text-orange-600"
                              onSelect={() => handleAction([item.id], "Reject")}
                            >
                              Reject
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onSelect={() => handleAction([item.id], "Delete")}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
