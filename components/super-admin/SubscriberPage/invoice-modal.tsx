"use client";

import { ArrowLeft, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  invoiceNumber: string;
  issueDate: string;
  servicePeriod: string;
  amount: string;
  issuedTo: string;
  taxId: string;
  status: "Complete" | "Failed";
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriber: {
    name: string;
    email: string;
  } | null;
}

const mockInvoices: Invoice[] = [
  {
    invoiceNumber: "AA12345678",
    issueDate: "2024-01-15",
    servicePeriod: "2024/01/15 - 2024/02/14",
    amount: "TWD 890",
    issuedTo: "Beautiful Nails Studio",
    taxId: "12345678",
    status: "Failed",
  },
  {
    invoiceNumber: "AA12345677",
    issueDate: "2023-12-15",
    servicePeriod: "2023/12/15 - 2024/01/14",
    amount: "TWD 890",
    issuedTo: "Beautiful Nails Studio",
    taxId: "12345678",
    status: "Complete",
  },
  {
    invoiceNumber: "AA12345676",
    issueDate: "2023-11-15",
    servicePeriod: "2023/11/15 - 2023/12/14",
    amount: "TWD 890",
    issuedTo: "Beautiful Nails Studio",
    taxId: "12345678",
    status: "Complete",
  },
];

export function InvoiceModal({
  isOpen,
  onClose,
  subscriber,
}: InvoiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <DialogTitle>Invoice History</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Notice Banner */}
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <span className="font-semibold">Taiwan E-Invoice Notice:</span>{" "}
              Electronic invoices are automatically issued after each successful
              payment and sent to your registered email
            </p>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Invoice Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Issue Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Service Period
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Issued To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice) => (
                  <tr
                    key={invoice.invoiceNumber}
                    className="border-b border-border last:border-0 hover:bg-accent/50"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-foreground">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {invoice.issueDate}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {invoice.servicePeriod}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-foreground">
                      {invoice.amount}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {invoice.issuedTo}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Tax ID: {invoice.taxId}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        className={
                          invoice.status === "Complete"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
