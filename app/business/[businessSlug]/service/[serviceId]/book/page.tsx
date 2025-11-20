"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

interface Slot {
  id: number;
  point: string;
  is_booked: boolean;
}

interface SlotsResponse {
  slots: Slot[];
  booking_token: string;
  timeout_seconds: number;
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const dataParam = searchParams.get("data");
  const booking = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
const customerNote = booking?.notes || "";
const selectedRequirements = booking?.requirements || [];
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [bookingToken, setBookingToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Step 1: Load available slots + get booking_token
  useEffect(() => {
    if (!booking?.serviceId) return;

    async function fetchAvailableSlots() {
      try {
        const res = await fetch("https://poodle-flexible-carefully.ngrok-free.app/customer_management/slots/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: booking.serviceId,
            adon_option_id: 0,
            adon_option_count: 0,
          }),
        });

        if (!res.ok) throw new Error("Failed to load slots");

        const data: SlotsResponse = await res.json();
        setBookingToken(data.booking_token); // ← Save token for final booking
        setAllSlots(data.slots.filter(s => !s.is_booked));
      } catch (err) {
        alert("Could not load available times");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailableSlots();
  }, [booking?.serviceId]);

  // Calendar logic
  const availableDates = [...new Set(allSlots.map(s => format(new Date(s.point), "yyyy-MM-dd")))];
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTimeSlotsForDate = (date: Date) => {
    return allSlots
      .filter(s => format(new Date(s.point), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
      .sort((a, b) => a.point.localeCompare(b.point));
  };

  const selectedDateSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];

  // Step 2: Confirm booking with your second endpoint
  const handleConfirm = async () => {
    if (!selectedSlot || !bookingToken) {
      alert("Please select a time slot");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("https://poodle-flexible-carefully.ngrok-free.app/customer_management/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_token: bookingToken,
          slot_id: selectedSlot.id,
          customer_note: customerNote|| "",
          selected_requirements: (selectedRequirements || []).join(", "),
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Booking failed");
      }

      const result = await res.json();
      console.log("Booking successful:", result);

      // Success → Go to confirmed page
      const confirmPath = pathname.replace("/book", "/confirmed");
      window.location.href = `${confirmPath}?success=1&slot_id=${selectedSlot.id}`;
    } catch (err: any) {
      alert(err.message || "Failed to confirm appointment. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading calendar...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href={pathname.replace("/book", "")} className="flex items-center gap-2 text-pink-600 font-medium mb-8">
        <FiChevronLeft /> Back to service
      </Link>

      <div className="">
        <h1 className="text-2xl font-bold text-center mb-2">{booking?.serviceName}</h1>
        <p className="text-center text-gray-600 mb-8">{booking?.duration} mins • ${booking?.price}</p>

        <div className="flex flex-col gap-10">
          {/* Calendar */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
              <div className="flex gap-2">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="py-2">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const hasSlot = availableDates.includes(dateStr);
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toString()}
                    onClick={() => hasSlot && setSelectedDate(day)}
                    disabled={!hasSlot}
                    className={`
                      py-4 rounded-lg text-sm font-medium transition-all
                      ${!isSameMonth(day, currentMonth) ? "text-gray-300" : ""}
                      ${!hasSlot ? "text-gray-400 cursor-not-allowed" : "hover:bg-pink-50"}
                      ${isSelected ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "bg-gray-50"}
                    `}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a date"}
            </h3>

            {!selectedDate ? (
              <p className="text-gray-500 text-center py-20">Please select a date from the calendar</p>
            ) : selectedDateSlots.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No times available</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {selectedDateSlots.map(slot => {
                  const timeStr = format(new Date(slot.point), "HH:mm");
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-4 rounded-lg font-medium transition-all
                        ${selectedSlot?.id === slot.id
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                      {timeStr}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t">
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot || submitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {submitting ? "Confirming..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}