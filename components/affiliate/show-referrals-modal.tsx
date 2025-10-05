"use client";

import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils"; // Make sure you have this utility from Shadcn

interface ShowReferralsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // The 'affiliate' prop is no longer used for the title but might be needed for data fetching
  affiliate: { name: string; email: string; referrals?: number } | null;
}

// 1. Expanded mock data to match the new design
const mockReferrals = [
  {
    user: "emma.w***@gmail.com",
    signupDate: "2024-01-15",
    plan: "Professional",
    status: "Paid",
    commission: 89,
    firstPayment: "2024-01-15",
  },
  {
    user: "mike.c***@yahoo.com",
    signupDate: "2024-01-12",
    plan: "Professional",
    status: "Paid",
    commission: 89,
    firstPayment: "2024-01-12",
  },
  {
    user: "anna.l***@hotmail.com",
    signupDate: "2024-01-10",
    plan: "Free",
    status: "Active",
    commission: 0,
    firstPayment: "-",
  },
  {
    user: "david.k***@gmail.com",
    signupDate: "2024-01-08",
    plan: "Professional",
    status: "Paid",
    commission: 89,
    firstPayment: "2024-01-08",
  },
  {
    user: "lisa.m***@gmail.com",
    signupDate: "2024-01-05",
    plan: "Professional",
    status: "Pause",
    commission: 0,
    firstPayment: "2024-01-05",
  },
];

// 2. Helper functions to get dynamic badge styles, keeping the JSX clean
const getPlanBadgeClasses = (plan: string) => {
  switch (plan.toLowerCase()) {
    case "professional":
      return "bg-gray-800 hover:bg-gray-700 text-white";
    case "free":
      return "bg-gray-100 hover:bg-gray-200 text-gray-700";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const getStatusBadgeClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-gray-800 hover:bg-gray-700 text-white";
    case "active":
      return "bg-gray-100 hover:bg-gray-200 text-gray-700";
    case "pause":
      return "bg-red-600 hover:bg-red-700 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export function ShowReferralsModal({
  isOpen,
  onClose,
}: ShowReferralsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 3. Increased modal width for the table layout */}
      <DialogContent className="max-w-5xl bg-background p-0">
        <div className="p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="mb-4 flex items-center gap-2 px-0 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {/* 4. Responsive Header: Title on the left, Search on the right */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Referrals
            </h2>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number"
                className="w-full rounded-md bg-gray-100 pl-9 md:w-64"
              />
            </div>
          </div>

          {/* 5. Responsive Table Wrapper */}
          <div className="mt-6 w-full overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100">
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    User
                  </TableHead>
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    Signup Date
                  </TableHead>
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    Plan
                  </TableHead>
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-1">
                      Status <ChevronRight className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    Commission
                  </TableHead>
                  <TableHead className="py-3 text-sm font-medium text-gray-600">
                    First Payment
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReferrals.map((referral) => (
                  <TableRow key={referral.user} className="border-t">
                    <TableCell className="py-4 font-medium">
                      {referral.user}
                    </TableCell>
                    <TableCell className="py-4 text-gray-600">
                      {referral.signupDate}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={cn(
                          "border-none text-xs",
                          getPlanBadgeClasses(referral.plan)
                        )}
                      >
                        {referral.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={cn(
                          "border-none text-xs",
                          getStatusBadgeClasses(referral.status)
                        )}
                      >
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "py-4 font-semibold",
                        referral.commission > 0
                          ? "text-green-600"
                          : "text-gray-600"
                      )}
                    >
                      {referral.commission > 0
                        ? `TWD ${referral.commission}`
                        : "TWD 0"}
                    </TableCell>
                    <TableCell className="py-4 text-gray-600">
                      {referral.firstPayment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
