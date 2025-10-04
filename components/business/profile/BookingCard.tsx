import {
  FiCalendar,
  FiUser,
  FiClock,
  FiMoreHorizontal,
  FiXCircle,
} from "react-icons/fi";
import Image from "next/image";

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

const BookingCard = ({ booking }: { booking: any }) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <Image
        src="https://via.placeholder.com/150"
        alt={booking.service}
        width={100}
        height={100}
        className="w-full sm:w-24 h-24 rounded-md object-cover"
      />

      {/* Main Details */}
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{booking.service}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
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
          {booking.status === "Not arrived" ? (
            <button className="text-sm text-red-600 font-semibold flex items-center gap-1 hover:text-red-800">
              <FiXCircle /> Cancel Booking
            </button>
          ) : (
            <button className="text-gray-500">
              <FiMoreHorizontal />
            </button>
          )}
        </div>

        {booking.notes && (
          <div>
            <h4 className="text-xs font-bold text-gray-500">Customer Notes</h4>
            <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end pt-4 sm:pt-0 border-t sm:border-0 sm:pl-4 sm:border-l">
        <p className="font-bold text-lg text-gray-800">${booking.price}</p>
        <StatusPill status={booking.status} />
      </div>
    </div>
  );
};

export default BookingCard;
