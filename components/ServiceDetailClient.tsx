// components/ServiceDetailClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

type AddOn = {
  id: string;
  name: string;
  price: number;
  duration?: number;
  quantity: number;
};

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

  // Requirements selection
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const toggleRequirement = (r: string) =>
    setSelectedReqs((p) =>
      p.includes(r) ? p.filter((x) => x !== r) : [...p, r]
    );

  // Customer notes
  const [customerNotes, setCustomerNotes] = useState("");

  // Carousel
  const images: string[] =
    service.images && service.images.length
      ? service.images
      : [service.image || "/placeholder.png"];
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  // Add-ons — example: if service has addOns, use them; otherwise empty
  const initialAddOns: AddOn[] =
    (service.addOns || []).map((a: any) => ({ ...a, quantity: 0 })) || [];
  const [addOns, setAddOns] = useState<AddOn[]>(initialAddOns);

  const incAddOn = (id: string) =>
    setAddOns((prev) =>
      prev.map((a) => (a.id === id ? { ...a, quantity: a.quantity + 1 } : a))
    );
  const decAddOn = (id: string) =>
    setAddOns((prev) =>
      prev.map((a) =>
        a.id === id && a.quantity > 0 ? { ...a, quantity: a.quantity - 1 } : a
      )
    );

  // Totals
  const totalAddOnPrice = useMemo(
    () => addOns.reduce((sum, a) => sum + a.price * a.quantity, 0),
    [addOns]
  );
  const totalPrice = useMemo(
    () => (service.basePrice || 0) + totalAddOnPrice,
    [service.basePrice, totalAddOnPrice]
  );

  const totalAddOnDuration = useMemo(
    () => addOns.reduce((sum, a) => sum + (a.duration || 0) * a.quantity, 0),
    [addOns]
  );
  const totalDuration = (service.baseDuration || 0) + totalAddOnDuration;

  // Booking: choose approach — quick client query vs server-side booking session
  // Here we show quick client-side redirect using encoded JSON as query param
  const [isBooking, setIsBooking] = useState(false);
  const handleConfirm = async () => {
    setIsBooking(true);
    try {
      const bookingObj = {
        serviceId,
        serviceName: service.name,
        businessSlug,
        price: totalPrice,
        duration: totalDuration,
        selectedReqs,
        addOns: addOns.filter((a) => a.quantity > 0),
        notes: customerNotes,
      };

      // OPTION A (quick): send booking data via encoded query string (small payload only)
      const q = encodeURIComponent(JSON.stringify(bookingObj));
      router.push(
        `/business/${businessSlug}/service/${serviceId}/book?data=${q}`
      );

      // OPTION B (recommended): POST to your backend to create a booking session and redirect to /book/{sessionId}
      // const res = await fetch('/api/bookings', {method:'POST', body: JSON.stringify(bookingObj)});
      // const { sessionId } = await res.json();
      // router.push(`/${businessSlug}/book/${sessionId}`);
    } catch (err) {
      console.error(err);
      setIsBooking(false);
      // show toast / error UI
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <Link
        href={`/${businessSlug}`}
        className="flex items-center gap-2 text-sm text-gray-600 mb-6"
      >
        <FiChevronLeft /> All Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Carousel */}
        <div className="relative rounded-lg overflow-hidden">
          <div className="relative w-full aspect-[4/3]">
            {/* Next.js Image recommended — ensure domain in next.config.js for external images */}
            <Image
              src={images[index]}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {index + 1} / {images.length}
          </div>

          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FiChevronRight />
          </button>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <div className="flex justify-between items-baseline border-b py-4">
            <div>
              <p className="text-sm text-gray-500">Base Duration:</p>
              <p className="font-semibold">{service.baseDuration} minutes</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Price:</p>
              <p className="font-semibold">${service.basePrice}</p>
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-2">Description</h3>
          <p className="text-gray-600 text-sm">{service.description}</p>
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-12">
        <h3 className="text-lg font-bold">Special Requirements</h3>
        <p className="text-sm text-gray-500">
          Select preferences to personalize experience
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {service.requirements?.map((req: string) => {
            const active = selectedReqs.includes(req);
            return (
              <button
                key={req}
                onClick={() => toggleRequirement(req)}
                aria-pressed={active}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition ${
                  active
                    ? "bg-pink-500 border-pink-500 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {req}
              </button>
            );
          })}
        </div>

        {selectedReqs.length > 0 && (
          <div className="mt-4 p-4 bg-pink-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">
              Selected Requirements ({selectedReqs.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedReqs.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-1 bg-white border px-2 py-1 rounded-full text-xs text-pink-700"
                >
                  <span>{r}</span>
                  <button
                    onClick={() => toggleRequirement(r)}
                    aria-label={`Remove ${r}`}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add-ons & summary */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Add-ons (optional)</h3>
          {addOns.length === 0 ? (
            <p className="text-sm text-gray-500">
              No add-ons available for this service.
            </p>
          ) : (
            <div className="space-y-3">
              {addOns.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between bg-white border rounded-lg p-3"
                >
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-sm text-gray-500">
                      ${a.price} • {a.duration ?? 0} min
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decAddOn(a.id)}
                      aria-label={`decrease ${a.name}`}
                      className="p-1 rounded border"
                    >
                      <FiMinus />
                    </button>
                    <div className="px-3">{a.quantity}</div>
                    <button
                      onClick={() => incAddOn(a.id)}
                      aria-label={`increase ${a.name}`}
                      className="p-1 rounded border"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Customer Notes</h3>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              rows={4}
              className="w-full border-gray-300 rounded-lg p-3 text-sm"
              placeholder="Any specifics?"
            ></textarea>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Price Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Total Duration</span>
            <span className="font-semibold">{totalDuration} minutes</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">Add-ons</span>
            <span className="font-semibold">${totalAddOnPrice}</span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>

          <button
            disabled={isBooking}
            onClick={handleConfirm}
            className="block w-full mt-6 bg-gray-800 text-white py-3 rounded-lg disabled:opacity-60"
          >
            {isBooking ? "Redirecting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
