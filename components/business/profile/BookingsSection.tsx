"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";

// MOCK BOOKINGS DATA
const mockBookings = [
  {
    id: 1,
    service: "Classic French Manicure",
    date: "Dec 28, 2024 at 2:00 PM",
    technician: "Sarah Chen",
    duration: 75,
    notes: "Please use gentle products as I have sensitive skin.",
    addOns: ["Gel Removal (in-house)"],
    requirements: ["Heat Sensitive", "Quiet Service"],
    price: 35,
    status: "Not arrived",
  },
  {
    id: 2,
    service: "Red Gel Polish",
    date: "Dec 15, 2024 at 11:00 AM",
    technician: "Emily Wong",
    duration: 45,
    notes: null,
    addOns: [],
    requirements: ["Heat Sensitive"],
    price: 35,
    status: "Completed",
  },
  {
    id: 3,
    service: "Floral Nail Art",
    date: "Nov 22, 2024 at 4:30 PM",
    technician: "Maria Rodriguez",
    duration: 105,
    notes: "Please use gentle products as I have sensitive skin.",
    addOns: ["Gel Removal (Other salon)", "Extension (2 fingers)"],
    requirements: ["Heat Sensitive", "Quiet Service", "Avoid 3D Designs"],
    price: 80,
    status: "Completed",
  },
];

const BookingsSection = () => {
  const [activeSubTab, setActiveSubTab] = useState<"current" | "previous">(
    "current"
  );

  return (
    <div>
      <div className="flex items-center gap-2 border-b mb-6">
        <button
          onClick={() => setActiveSubTab("current")}
          className={`py-2 px-4 text-sm font-semibold ${
            activeSubTab === "current"
              ? "border-b-2 border-pink-500 text-pink-500"
              : "text-gray-500"
          }`}
        >
          Current
        </button>
        <button
          onClick={() => setActiveSubTab("previous")}
          className={`py-2 px-4 text-sm font-semibold ${
            activeSubTab === "previous"
              ? "border-b-2 border-pink-500 text-pink-500"
              : "text-gray-500"
          }`}
        >
          Previous
        </button>
      </div>
      <div className="space-y-6">
        {mockBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsSection;
