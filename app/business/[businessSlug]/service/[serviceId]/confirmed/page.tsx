import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiUser,
  FiCalendar,
  FiHeart,
  FiMapPin,
  FiInfo,
  FiClock,
} from "react-icons/fi";

// Helper to format the date nicely
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { businessSlug: string };
  searchParams: Record<string, string>;
}) {
  const { businessSlug } = params;
  const dataParam = searchParams.data;
  const dateParam = searchParams.date;
  const timeParam = searchParams.time;
  const booking = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;

  const serviceName = booking?.serviceName || "N/A";
  const price = booking?.price || "N/A";
  const duration = booking?.duration || "N/A";
  const date = dateParam ? new Date(dateParam).toLocaleDateString() : "N/A";
  const time = timeParam || "N/A";
  const preferences = [
    "Hands frequently exposed to water",
    "Frequently uses fingertips for work/activities",
  ];

  return (
    <div className="max-w-xl mx-auto pb-6">
      <div className="text-center mb-8">
        <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Your appointment has been confirmed. We look forward to serving you!
        </p>
      </div>

      {/* Main Confirmation Card */}
      <div className="bg-white p-6 rounded-lg shadow-md border space-y-6">
        {/* Appointment Details */}
        <div>
          <h2 className="font-bold text-lg mb-4">Appointment Details</h2>
          <div className="flex items-center gap-4">
            <Image
              width={64}
              height={64}
              src="https://via.placeholder.com/64"
              alt="Service"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold">{serviceName}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1.5">
                  <FiUser size={14} /> Yuki Tanaka
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={14} /> {duration} minutes
                </span>
              </div>
            </div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <FiCalendar className="text-pink-500" />
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Your Preferences */}
        <div>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <FiHeart className="text-pink-500" /> Your Preferences
          </h2>
          <div className="flex flex-wrap gap-2">
            {preferences.map((pref) => (
              <span
                key={pref}
                className="bg-pink-50 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full"
              >
                {pref}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Your nail technician has been notified of your preferences.
          </p>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between items-center font-bold text-lg border-t pt-4">
          <span>Total Amount</span>
          <span className="text-pink-500">${price}</span>
        </div>
      </div>

      {/* Studio Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border mt-6">
        <h2 className="font-bold text-lg mb-4">Studio Information</h2>
        <div className="flex items-start gap-3">
          <FiMapPin className="text-gray-500 mt-1" />
          <div>
            <h3 className="font-semibold">Nail Studio</h3>
            <p className="text-sm text-gray-500">
              123 Beauty Street, 2nd Floor, New York, NY 10001
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Contact: (555) 123-4567
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mt-6 text-sm text-yellow-800">
        <h2 className="font-bold mb-3 flex items-center gap-2">
          <FiInfo /> Important Notes
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Please arrive 10 minutes early.</li>
          <li>
            To cancel or reschedule, please notify us 24 hours in advance.
          </li>
          <li>Please keep your nails clean and avoid using hand cream.</li>
          <li>
            If you have any allergies, please inform your nail technician.
          </li>
        </ul>
      </div>

      <Link
        href={`/business/${businessSlug}/profile`}
        className="block w-full text-center mt-8 bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-white font-semibold py-3 rounded-lg hover:bg-gray-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
