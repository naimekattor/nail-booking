import { FiAlertTriangle, FiCalendar, FiCreditCard } from "react-icons/fi";

const SubscriptionTab = () => {
  return (
    <div className="bg-white p-6 border rounded-lg max-w-4xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Current Plan 👑 </p>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Pro Plan
          </h3>
          <p className="text-gray-600">TWD 880 / month</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <FiAlertTriangle className="text-red-500 text-xl mt-1" />
        <div>
          <h4 className="font-semibold text-red-700">
            Payment failed, service is limited. Please update payment method or
            retry payment.
          </h4>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-3 text-gray-600">
          <FiCalendar />
          <span>
            Next billing date:{" "}
            <span className="font-medium text-gray-800">2024-01-15</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <FiCreditCard />
          <span>
            Payment method:{" "}
            <span className="font-medium text-gray-800">
              Credit card****1234
            </span>
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border-gray-300 border-1 text-gray-800 font-semibold rounded-md hover:bg-[#C06EF3] hover:text-white">
            Free
          </button>
          <button className="px-4 py-2 border-gray-300 border-1 text-gray-800 font-semibold rounded-md hover:bg-[#C06EF3] hover:text-white">
            Upgrade
          </button>
          <button className="px-4 py-2 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-50">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;
