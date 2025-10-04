"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-09-01T12:00:00Z")
  ); // Mocked current month

  const changeMonth = (amount: number) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + amount))
    );
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // MOCK CALENDAR DAYS - a real implementation would use a date library like date-fns
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstDayOfMonth = 5; // Friday
  const calendarDays = [...Array(firstDayOfMonth).fill(null), ...daysInMonth];

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FiChevronLeft />
        </button>
        <h3 className="font-semibold text-lg">
          {currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <FiChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="w-full aspect-square flex items-center justify-center"
          >
            {day && (
              <button
                onClick={() => onDateSelect(new Date(currentDate.setDate(day)))}
                className={`w-10 h-10 rounded-full transition-colors ${
                  selectedDate &&
                  isSameDay(selectedDate, new Date(new Date().setDate(day)))
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
