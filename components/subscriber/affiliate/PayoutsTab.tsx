import StatusPill from "@/components/ui/StatusPill";
import { FiInfo } from "react-icons/fi";

const mockPayouts = [
  {
    date: "2024-01-10",
    amount: "TWD 18,900",
    method: "Bank Transfer",
    status: "Pending",
    account: "First Bank 1234-567-890123",
  },
  {
    date: "2023-12-10",
    amount: "TWD 15,600",
    method: "Bank Transfer",
    status: "Rejected",
    account: "First Bank 1234-567-890123",
  },
  {
    date: "2023-11-10",
    amount: "TWD 12,300",
    method: "Bank Transfer",
    status: "Cancelled",
    account: "First Bank 1234-567-890123",
  },
  {
    date: "2023-10-10",
    amount: "TWD 11,500",
    method: "Bank Transfer",
    status: "Completed",
    account: "First Bank 1234-567-890123",
  },
];

const PayoutsTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payout Status
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr className="border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment Account</th>
            </tr>
          </thead>
          <tbody>
            {mockPayouts.map((payout, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{payout.date}</td>
                <td className="p-3 font-semibold text-gray-900">
                  {payout.amount}
                </td>
                <td className="p-3">{payout.method}</td>
                <td className="p-3">
                  <StatusPill type={payout.status} />
                </td>
                <td className="p-3">{payout.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3 text-sm text-blue-700">
        <FiInfo />
        <span>
          <strong>Payout Schedule:</strong> Withdrawal requests are processed on
          the 10th of the next month after application. Minimum withdrawal
          amount is TWD 1,000.
        </span>
      </div>
    </div>
  );
};

export default PayoutsTab;
