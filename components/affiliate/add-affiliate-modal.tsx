"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAffiliateModal({ isOpen, onClose }: AddAffiliateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rule: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Add affiliate form submitted:", formData);
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
            Add New Affiliate
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter affiliate name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule">Affiliate Rule</Label>
              <Select
                value={formData.rule}
                onValueChange={(value) =>
                  setFormData({ ...formData, rule: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="vip">VIP partner</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-pink-600 text-primary-foreground hover:opacity-90"
            >
              Add Affiliate
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
