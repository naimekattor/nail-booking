"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplyAffiliateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: { name: string; email: string } | null;
}

export function ApplyAffiliateRuleModal({
  isOpen,
  onClose,
  affiliate,
}: ApplyAffiliateRuleModalProps) {
  const [rule, setRule] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Apply affiliate rule:", { rule, affiliate });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background p-0">
        <div className="p-6">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="mb-4 gap-2 px-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button> */}

          <h2 className="mb-6 text-center text-xl font-semibold">
            Apply affiliate rule
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rule">Rules</Label>
              <Select value={rule} onValueChange={setRule}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="vip">VIP partner</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-primary-foreground hover:opacity-90 rounded-md"
            >
              Confirm
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
