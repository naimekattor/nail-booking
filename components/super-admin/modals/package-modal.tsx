"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PackageModal = ({ isOpen, onClose }: PackageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // Modal Styles: light background, rounded corners
        className="sm:max-w-[425px] md:max-w-[600px] rounded-lg bg-[#EEF0F3]"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-gray-800">
            Pro package
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            {/* Label Styles: medium gray color */}
            <Label htmlFor="name" className="text-gray-600">
              Name
            </Label>
            {/* Input Styles: white background, subtle border, rounded corners */}
            <Input
              id="name"
              defaultValue="Enter here"
              className="rounded-md border-none bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder="Enter here"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price" className="text-gray-600">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              defaultValue="Enter here"
              className="rounded-md border-none bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder="Enter here"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-md">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            onClick={onClose}
            // Button Styles: gradient background, rounded corners, white text
            className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageModal;
