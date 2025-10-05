"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the props the modal will accept
interface TargetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TargetModal = ({ isOpen, onClose }: TargetModalProps) => {
  const handleSaveChanges = () => {
    // Add your logic to save the target value here
    console.log("Saving changes...");
    onClose(); // Close the modal after saving
  };

  return (
    // The Dialog component manages the modal's open/close state
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // Style the modal content to match the design
        className="sm:max-w-md rounded-lg bg-gray-50 p-8"
      >
        <DialogHeader>
          <DialogTitle
            // Style the title to be centered and bold
            className="text-center text-2xl font-semibold text-gray-800"
          >
            Target Set Up
          </DialogTitle>
        </DialogHeader>

        {/* Main content of the modal */}
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <Label
              htmlFor="revenue-target"
              className="text-sm font-medium text-gray-600"
            >
              Annual Revenue Target
            </Label>
            <Input
              id="revenue-target"
              type="number"
              // Style the input to be clean and modern
              className="rounded-lg border-none bg-white p-3 text-gray-700 shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         placeholder:text-gray-400"
              placeholder="Enter here"
            />
          </div>
        </div>

        {/* Modal footer with the action button */}
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSaveChanges}
            // Apply the gradient and other styles to the button
            className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 
                       text-base font-semibold text-white transition hover:opacity-90"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TargetModal;
