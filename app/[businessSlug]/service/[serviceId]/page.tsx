"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

// MOCK DATA: Fetch service details based on serviceId
const serviceDetails = {
  id: "3",
  name: "Rose Gold Glam",
  baseDuration: 85,
  basePrice: 42,
  description:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  images: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
  requirements: [
    "Sensitive to heat",
    "Frequently uses fingertips for work/activities",
    "Hands frequently exposed to water",
    "Avoid 3D or raised designs",
    "Has thin or soft nails",
    "Prefers quiet service",
    "Prefers no visible free edge",
  ],
};

export default function ServiceDetailPage({
  params,
}: {
  params: { businessSlug: string; serviceId: string };
}) {
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [customerNotes, setCustomerNotes] = useState("");

  // Add-on state management would be more complex in a real app
  const [addOns, setAddOns] = useState<
    { name: string; price: number; quantity: number }[]
  >([]);

  const toggleRequirement = (req: string) => {
    setSelectedReqs((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const totalDuration = serviceDetails.baseDuration; // + add-on durations
  const totalPrice = serviceDetails.basePrice; // + add-on prices

  // Create a query string to pass state to the next page
  const bookingQuery = new URLSearchParams({
    serviceName: serviceDetails.name,
    duration: totalDuration.toString(),
    price: totalPrice.toString(),
    // Add other selected options here
  }).toString();

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        href={`/${params.businessSlug}`}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiChevronLeft />
        All Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Carousel */}
        <div className="relative aspect-square">
          <img
            src="https://via.placeholder.com/600"
            alt={serviceDetails.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            1 / 2
          </div>
          <button className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
            <FiChevronLeft />
          </button>
          <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
            <FiChevronRight />
          </button>
        </div>

        {/* Service Details */}
        <div>
          <h1 className="text-3xl font-bold">{serviceDetails.name}</h1>
          <div className="flex justify-between items-baseline border-b py-4">
            <div>
              <p className="text-sm text-gray-500">Base Duration:</p>
              <p className="font-semibold">
                {serviceDetails.baseDuration} minutes
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Price:</p>
              <p className="font-semibold">${serviceDetails.basePrice}</p>
            </div>
          </div>
          <h3 className="font-semibold mt-6 mb-2">Description</h3>
          <p className="text-gray-600 text-sm">{serviceDetails.description}</p>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="mt-12">
        <h3 className="text-lg font-bold">Special Requirements</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select your preferences to personalize your experience
        </p>
        <div className="flex flex-wrap gap-3">
          {serviceDetails.requirements.map((req) => (
            <button
              key={req}
              onClick={() => toggleRequirement(req)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors ${
                selectedReqs.includes(req)
                  ? "bg-pink-500 border-pink-500 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {req}
            </button>
          ))}
        </div>
        {selectedReqs.length > 0 && (
          <div className="mt-4 p-4 bg-pink-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">
              Selected Requirements ({selectedReqs.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedReqs.map((req) => (
                <div
                  key={req}
                  className="flex items-center gap-1 bg-white border border-pink-200 text-pink-700 text-xs px-2 py-1 rounded-full"
                >
                  <span>{req}</span>
                  <button onClick={() => toggleRequirement(req)}>
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add-ons, Notes, Summary */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Customer Notes</h3>
          <textarea
            placeholder="Let us know about any specific requests..."
            className="w-full border-gray-300 rounded-lg p-3 text-sm"
            rows={4}
          ></textarea>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Price Summary</h3>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-600">Total Duration:</span>
            <span className="font-semibold">{totalDuration} minutes</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
          <Link
            href={`/${params.businessSlug}/service/${params.serviceId}/book?${bookingQuery}`}
            className="block w-full text-center mt-6 bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700"
          >
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
}
