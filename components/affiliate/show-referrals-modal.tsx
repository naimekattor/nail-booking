"use client";

import { ArrowLeft, Users } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ShowReferralsModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: { name: string; email: string; referrals?: number } | null;
}

const mockReferrals = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    status: "Active",
    joinDate: "2024-01-20",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    status: "Pending",
    joinDate: "2024-02-01",
  },
];

export function ShowReferralsModal({
  isOpen,
  onClose,
  affiliate,
}: ShowReferralsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background p-0">
        <div className="p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="mb-4 gap-2 px-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Referrals</h2>
            <p className="text-sm text-muted-foreground">
              Showing referrals for {affiliate?.name || "affiliate"}
            </p>
          </div>

          <div className="space-y-3">
            {mockReferrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {referral.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="text-sm font-medium">{referral.joinDate}</p>
                  </div>
                  <Badge
                    className={
                      referral.status === "Active"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }
                  >
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Total Referrals: {mockReferrals.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
