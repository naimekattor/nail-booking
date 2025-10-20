"use client";
import { Booking, BookingWithParsedDate } from "@/types/booking";
import { useEffect } from "react";
import BookingCard from "./BookingCard";
const ITEMS_PER_PAGE = 3;
import { useState, Dispatch, SetStateAction } from "react";

const parseBookingDate = (dateString: string | null): Date | null => {
  if (typeof dateString !== "string") {
    console.warn("⚠️ Invalid date value:", dateString);
    return null;
  }

  const cleanString = dateString.replace(" at ", " ");
  const parsed = new Date(cleanString);

  if (isNaN(parsed.getTime())) {
    console.warn("⚠️ Could not parse date:", cleanString);
    return null;
  }

  return parsed;
};

const BookingsSection = () => {
  const [activeSubTab, setActiveSubTab] = useState<"current" | "previous">(
    "current"
  );
  const [bookings, setBookings] = useState<BookingWithParsedDate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://68e76da910e3f82fbf3f179a.mockapi.io/allbookings"
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data: Booking[] = await res.json();

        // sort safely
        const sorted = data
          .map((b) => ({
            ...b,
            parsedDate: parseBookingDate(b.date),
          }))
          .filter(
            (b): b is BookingWithParsedDate & { parsedDate: Date } =>
              b.parsedDate !== null
          )
          .sort((a, b) => b.parsedDate!.getTime() - a.parsedDate!.getTime());

        setBookings(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const now = new Date();
  const filteredBookings = bookings.filter((b) =>
    activeSubTab === "current"
      ? b.parsedDate && b.parsedDate >= now
      : b.parsedDate && b.parsedDate < now
  );

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubTab]);

  return (
    <div className="pb-26">
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

      {loading && <p className="text-gray-500">Loading bookings...</p>}

      <div className="space-y-6">
        {!loading && paginatedBookings.length > 0
          ? paginatedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                setBookings={setBookings}
                booking={booking}
              />
            ))
          : !loading && (
              <p className="text-gray-500 text-sm">No bookings found.</p>
            )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsSection;
