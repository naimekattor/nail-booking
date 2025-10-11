"use client";

import { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  isBefore,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date; // Optional: limit past dates
  maxDate?: Date; // Optional: limit future dates
  availableDates?: Date[]; // Optional: highlight available dates
}

const Calendar = ({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  maxDate,
  availableDates,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Days in current month
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Day of week offset for grid alignment
  const startDay = startOfMonth(currentMonth).getDay();
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  const isAvailable = (day: Date) => {
    if (!availableDates || availableDates.length === 0) return true; // all available if not restricted
    return availableDates.some((d) => isSameDay(d, day));
  };

  const isDisabled = (day: Date) => {
    const beforeMin = minDate && isBefore(day, minDate);
    const afterMax =
      maxDate && maxDate && isBefore(maxDate, day) === false && day > maxDate;
    return beforeMin || afterMax || !isAvailable(day);
  };

  return (
    <div className="border rounded-lg p-4 w-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            minDate && startOfMonth(currentMonth) <= startOfMonth(minDate)
          }
        >
          <FiChevronLeft />
        </button>
        <h3 className="font-semibold text-lg">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            maxDate && startOfMonth(currentMonth) >= startOfMonth(maxDate)
          }
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 font-medium mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((i) => (
          <div key={`blank-${i}`} />
        ))}

        {days.map((day) => {
          const selected = selectedDate && isSameDay(day, selectedDate);
          const today = isToday(day);
          const disabled = isDisabled(day);
          const available = isAvailable(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => !disabled && onDateSelect(day)}
              disabled={disabled}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors
                ${selected ? "bg-gray-800 text-white" : ""}
                ${!selected && today ? "border border-gray-800" : ""}
                ${!selected && !today && available ? "hover:bg-gray-100" : ""}
                ${disabled ? "text-gray-300 cursor-not-allowed" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
