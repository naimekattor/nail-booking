"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApplyRateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: { name: string; email: string } | null;
}

export function ApplyRateTimeModal({
  isOpen,
  onClose,
  affiliate,
}: ApplyRateTimeModalProps) {
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Apply rate and time:", { rate, duration, affiliate });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background p-0">
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

          <h2 className="mb-6 text-center text-xl font-semibold">
            Apply Rate and Time
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Rate</Label>
              <Input
                id="rate"
                placeholder="Enter Percentage here"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <div className="relative">
                <Input
                  id="duration"
                  placeholder="Eg. 9:30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
                <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-pink-600 text-primary-foreground hover:opacity-90"
            >
              Confirm
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
