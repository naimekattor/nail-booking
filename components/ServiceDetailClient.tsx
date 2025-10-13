// components/ServiceDetailClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CarouselCards from "./ServiceCarousel";

type Requirement = string;
type AvailableAddOn = {
  id: string;
  name: string;
  price: number;
  duration: number;
};
type ChosenAddOn = AvailableAddOn & { quantity: number; customPrice: number };

export default function ServiceDetailClient({
  service,
  businessSlug,
  serviceId,
}: {
  service: any;
  businessSlug: string;
  serviceId: string;
}) {
  const router = useRouter();

  const [selectedReqs, setSelectedReqs] = useState<Requirement[]>([]);
  const [customerNotes, setCustomerNotes] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const availableAddOns: AvailableAddOn[] = service.addOns || [];
  const [chosenAddOns, setChosenAddOns] = useState<ChosenAddOn[]>([]);
  const [newAddOnName, setNewAddOnName] = useState("");

  const addNewAddOn = () => {
    if (!newAddOnName.trim()) return;
    const newId = `custom-${Date.now()}`;
    setChosenAddOns((prev) => [
      ...prev,
      {
        id: newId,
        name: newAddOnName,
        price: 0,
        duration: 0,
        quantity: 1,
        customPrice: 0,
      },
    ]);
    setNewAddOnName("");
  };

  const updateAddOnQuantity = (id: string, quantity: number) => {
    setChosenAddOns((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, quantity: Math.max(1, quantity) } : a
      )
    );
  };

  const updateAddOnPrice = (id: string, price: number) => {
    setChosenAddOns((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, customPrice: Math.max(0, price) } : a
      )
    );
  };

  const removeChosenAddOn = (id: string) => {
    setChosenAddOns((prev) => prev.filter((a) => a.id !== id));
  };

  const totalAddOnPrice = useMemo(
    () => chosenAddOns.reduce((sum, a) => sum + (a.customPrice || a.price), 0),
    [chosenAddOns]
  );
  const totalPrice = useMemo(
    () => (service.price || 0) + totalAddOnPrice,
    [service.price, totalAddOnPrice]
  );
  const totalAddOnDuration = useMemo(
    () => chosenAddOns.reduce((sum, a) => sum + (a.duration || 0), 0),
    [chosenAddOns]
  );
  const totalDuration = (service.duration || 0) + totalAddOnDuration;

  const images: string[] = service.images?.length
    ? service.images
    : [service.image || "/placeholder.png"];
  const prevImage = () =>
    setCarouselIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setCarouselIndex((i) => (i + 1) % images.length);

  const [isBooking, setIsBooking] = useState(false);
  const handleConfirm = async () => {
    setIsBooking(true);
    const bookingDetails = {
      serviceId,
      serviceName: service.name,
      price: totalPrice,
      duration: totalDuration,
      requirements: selectedReqs,
      addOns: chosenAddOns,
      notes: customerNotes,
    };
    const query = encodeURIComponent(JSON.stringify(bookingDetails));
    router.push(
      `/business/${businessSlug}/service/${serviceId}/book?data=${query}`
    );
  };
  console.log(service.serviceDetails.images);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white px-4 py-3">
        <Link
          href={`/${businessSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> All Services
        </Link>
      </div>

      {/* Main Content - 2 Column Grid Layout */}
      <div className="mx-auto max-w-[1400px] py-6">
        <CarouselCards storiesData={service.serviceDetails.images} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN - Image Carousel (4 cols) */}

          <div className="space-y-6 lg:col-span-6 shrink">
            <div className="mt-4 rounded-lg border bg-white p-4">
              <h1 className="text-xl font-bold text-gray-900">
                {service.name || "Rose Gold Glam"}
              </h1>
              <div className="mt-3 flex items-center gap-8">
                <div>
                  <p className="text-xs text-gray-500">Base Duration:</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {service.duration || 85} minutes
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500">Base Price:</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${service.price || 42}
                  </p>
                </div>
              </div>
            </div>
            {/* Special Requirements */}
            <div className="rounded-lg border bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">
                Special Requirements
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Select your preferences to personalize your experience
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  service.requirements || [
                    "Sensitive to heat",
                    "Frequently uses fingertips for work/activities",
                    "Hands frequently exposed to water",
                    "Avoid 3D or raised designs",
                    "Has thin or soft nails",
                    "Prefers quiet service",
                    "Prefers no visible free edge",
                  ]
                ).map((req: string) => (
                  <button
                    key={req}
                    onClick={() =>
                      setSelectedReqs((p) =>
                        p.includes(req)
                          ? p.filter((x) => x !== req)
                          : [...p, req]
                      )
                    }
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                      selectedReqs.includes(req)
                        ? "border-[#F2319F] bg-[#F2319F] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {req}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <h3 className="text-base font-semibold text-gray-900">
                  Add ons
                </h3>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Any additional Service
              </p>

              <div className="mt-4 flex gap-2">
                <Input
                  value={newAddOnName}
                  onChange={(e) => setNewAddOnName(e.target.value)}
                  placeholder="Choose add ons"
                  className="flex-1 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && addNewAddOn()}
                />
                <Button
                  onClick={addNewAddOn}
                  size="sm"
                  variant="outline"
                  className="px-3"
                >
                  Add
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {chosenAddOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="relative rounded-lg border bg-gray-50 p-4"
                  >
                    <button
                      onClick={() => removeChosenAddOn(addOn.id)}
                      className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-200"
                    >
                      <X className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                    <p className="pr-6 text-sm font-semibold text-gray-900">
                      {addOn.name}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">
                          Additional Price
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {addOn.customPrice || addOn.price}NT$
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Additional Time</p>
                        <p className="text-sm font-medium text-gray-900">
                          {addOn.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 rounded-md border border-gray-200 bg-white p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Quantity:</span>
                        <Input
                          type="number"
                          min="1"
                          value={addOn.quantity}
                          onChange={(e) =>
                            updateAddOnQuantity(
                              addOn.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="h-7 w-16 text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Price:</span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={addOn.customPrice || addOn.price}
                          onChange={(e) =>
                            updateAddOnPrice(
                              addOn.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="h-7 w-20 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Description, Selected Reqs, Notes, Summary (4 cols) */}
          <div className="space-y-6 lg:col-span-6">
            {/* Description */}
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-base font-semibold text-gray-900">
                  Description
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {service.description ||
                  "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages, and more recently with"}
              </p>
            </div>

            {/* Selected Requirements */}
            {selectedReqs.length > 0 && (
              <div className="rounded-lg border border-pink-200 bg-pink-50 p-5">
                <h4 className="text-sm font-semibold text-gray-900">
                  Selected Requirements ({selectedReqs.length})
                </h4>
                <p className="mt-1 text-xs text-gray-600">
                  Let the technician know if your hands are often in water or
                  used for detailed work
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedReqs.map((req) => (
                    <div
                      key={req}
                      className="flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700"
                    >
                      <span>{req}</span>
                      <button
                        onClick={() =>
                          setSelectedReqs((p) => p.filter((x) => x !== req))
                        }
                        className="hover:text-pink-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Notes */}
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <h3 className="text-base font-semibold text-gray-900">
                  Customer Notes
                </h3>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Any additional requests or information
              </p>
              <Textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={4}
                className="mt-3 resize-none text-sm"
                placeholder="Let us know about any specific requests, design ideas, nail concerns, or other details..."
              />
            </div>

            {/* Price Summary */}
            <div className="rounded-lg border bg-gray-50 p-5">
              <h3 className="text-base font-semibold text-gray-900">
                Price Summary
              </h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-semibold text-gray-900">
                    {totalDuration} minutes
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-semibold text-gray-900">
                    ${totalPrice}
                  </span>
                </div>
              </div>
              <Button
                disabled={isBooking}
                onClick={handleConfirm}
                className="mt-4 w-full bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-sm font-semibold hover:bg-gray-800"
              >
                {isBooking ? "Confirming..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
