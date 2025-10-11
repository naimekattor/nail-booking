"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Calendar from "@/components/business/Calendar";
import TimeSlotPicker from "@/components/business/TimeSlotPicker";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read service details from the URL. Fallback values are for safety.
  const serviceName = searchParams.get("serviceName") || "Service";
  const duration = searchParams.get("duration") || "N/A";
  const price = searchParams.get("price") || "N/A";

  // State for user selections on this page
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2025-09-20T12:00:00Z")
  ); // Mock pre-selected date
  const [selectedTime, setSelectedTime] = useState<string | null>("12:00"); // Mock pre-selected time

  const handleConfirmTime = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    // Prepare the search params for the final confirmation page
    const finalParams = new URLSearchParams(searchParams.toString());
    finalParams.set("date", selectedDate.toISOString());
    finalParams.set("time", selectedTime);

    // Navigate to the confirmation page, which is one level up and then into '/confirmed'
    const confirmationPath = pathname.replace("/book", "/confirmed");
    router.push(`${confirmationPath}?${finalParams.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto  p-8 rounded-lg ">
      <Link
        href={pathname.replace("/book", "")}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiChevronLeft />
        Select Date & Time
      </Link>

      {/* Service Details Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8 border">
        <h1 className="text-xl font-bold text-gray-800">{serviceName}</h1>
        <div className="text-sm text-gray-500 mt-1">
          <span>Duration: {duration} minutes</span>
          <span className="mx-2">|</span>
          <span>Price: ${price}</span>
        </div>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={(date) => setSelectedDate(date)}
        />
      </div>

      {/* Time Slot Picker */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Select Time</h2>
        <TimeSlotPicker
          selectedTime={selectedTime}
          onTimeSelect={(time) => setSelectedTime(time)}
        />
      </div>

      <div className="mt-8 border-t pt-6">
        <button
          onClick={handleConfirmTime}
          className="w-full bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Time
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          *Times shown fit your service duration ({duration} mins)
        </p>
      </div>
    </div>
  );
}
