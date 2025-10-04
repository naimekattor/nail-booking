"use client";

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

// MOCK: In a real app, this data would come from an API based on the selected date
const availableTimes = [
  "10:00",
  "17:30",
  "11:30",
  "16:00",
  "13:00",
  "10:30",
  "14:30",
  "12:00",
];

const TimeSlotPicker = ({
  selectedTime,
  onTimeSelect,
}: TimeSlotPickerProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {availableTimes.map((time) => (
        <button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`w-full p-3 border rounded-lg text-center font-semibold transition-colors ${
            selectedTime === time
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white border-gray-300 hover:border-gray-500"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
