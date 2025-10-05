"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react"; // Icon library

// Define the props for the modal
interface BusinessInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// A small helper component for displaying each piece of information
const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="w-full rounded-md bg-gray-100 px-3 py-2.5 text-sm text-gray-800">
      {value}
    </div>
  </div>
);

const BusinessInfoModal = ({ isOpen, onClose }: BusinessInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-gray-600" />
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Business Information
            </DialogTitle>
          </div>
          <DialogDescription className="pt-1">
            This information will be displayed to customers after booking
            confirmation
          </DialogDescription>
        </DialogHeader>

        {/* Information Fields */}
        <div className="grid gap-4 py-4">
          <InfoField label="Company Name" value="Elegant Nails Studio" />
          <InfoField
            label="Address"
            value="123 Beauty Street, Taipei City, Taiwan 10491"
          />
          <InfoField label="Phone Number" value="+886 2 2345 6789" />
          <InfoField label="Merchant Trade No" value="+886 2 2345 6789" />
        </div>

        {/* Footer Button */}
        <div className="pt-2">
          <Button
            type="button"
            onClick={onClose} // The button will close the modal
            className="w-full rounded-lg bg-pink-600 py-3 text-base font-semibold text-white transition hover:bg-pink-700"
          >
            Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessInfoModal;
