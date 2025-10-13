"use client";
import {
  FiCalendar,
  FiUser,
  FiClock,
  FiMoreHorizontal,
  FiXCircle,
} from "react-icons/fi";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import RatingModal from "./RatingModal";

const StatusPill = ({ status }: { status: string }) => {
  const isCompleted = status === "Completed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${
        isCompleted
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isCompleted ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
      {status}
    </span>
  );
};

const RequirementPill = ({ text }: { text: string }) => (
  <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
    {text}
  </span>
);

const BookingCard = ({ booking, setBookings }: { booking: any }) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const handleDelete = (id: string) => {
    const deleteBooking = async () => {
      try {
        const res = await fetch(
          `https://68e76da910e3f82fbf3f179a.mockapi.io/allbookings/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Failed to delete booking");

        console.log(`✅ Booking ${id} deleted successfully`);

        // Remove deleted booking from state to update UI immediately
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } catch (error) {
        console.error("❌ Delete failed:", error);
      }
    };

    deleteBooking();
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row gap-4">
      <div className="space-y-2">
        <div className="flex md:flex-row flex-col gap-4">
          {/* Image */}
          <Image
            src={
              booking?.image ||
              "https://i.ibb.co/v45txbyb/5654e7d60e384df08140d23901b55b-sf-house-of-nails-biz-photo-b7f36148b2c34cdcbe5193d268e41c-booksy.jpg"
            }
            alt={booking.service}
            width={100}
            height={100}
            className="w-full sm:w-24 h-24 rounded-md object-cover"
          />

          <div>
            <h3 className="font-bold text-gray-800">{booking.service}</h3>
            <div className="flex flex-col items-start gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1.5">
                <FiCalendar /> {booking.date}
              </span>
              <span className="flex items-center gap-1.5">
                <FiUser /> {booking.technician}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock /> {booking.duration} minutes
              </span>
            </div>
          </div>
        </div>
        {booking.notes && (
          <div>
            <h4 className="text-xs font-bold text-gray-500">Customer Notes</h4>
            <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
          </div>
        )}
      </div>

      {/* Main Details */}
      <div className="flex-1 space-y-3">
        <div className="flex flex-col gap-4">
          {booking.addOns.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 mb-1">
                Add-on Services
              </h4>
              <div className="flex flex-wrap gap-2">
                {booking.addOns.map((addon: string) => (
                  <span
                    key={addon}
                    className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {addon}
                  </span>
                ))}
              </div>
            </div>
          )}
          {booking.requirements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 mb-1">
                Special Requirements
              </h4>
              <div className="flex flex-wrap gap-2">
                {booking.requirements.map((req: string) => (
                  <RequirementPill key={req} text={req} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price and Status */}
      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end pt-4 sm:pt-0 ">
        <div className="flex justify-between items-start">
          {booking.status === "Not arrived" ? (
            <button className="text-sm text-red-600 font-semibold flex items-center gap-1 hover:text-red-800">
              <FiXCircle /> Cancel Booking
            </button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="text-gray-500">
                  <FiMoreHorizontal />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDelete(booking.id)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsRatingOpen(true)}>
                  Rate Now
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="font-bold text-lg text-gray-800">${booking.price}</p>
        <StatusPill status={booking.status} />
      </div>
      <RatingModal
        open={isRatingOpen}
        onOpenChange={setIsRatingOpen}
        serviceName={booking.service}
      />
    </div>
  );
};

export default BookingCard;
