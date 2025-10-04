import StatusPill from "@/components/ui/StatusPill";
import { FiSearch } from "react-icons/fi";

const mockReferrals = [
  {
    user: "8801775551325",
    signupDate: "2024-01-15",
    plan: "Professional",
    status: "Paid",
    commission: "TWD 89",
    firstPayment: "2024-01-15",
  },
  {
    user: "mike.c***@yahoo.com",
    signupDate: "2024-01-12",
    plan: "Professional",
    status: "Paid",
    commission: "TWD 89",
    firstPayment: "2024-01-12",
  },
  {
    user: "anna.l***@hotmail.com",
    signupDate: "2024-01-10",
    plan: "Free",
    status: "Active",
    commission: "TWD 0",
    firstPayment: "-",
  },
  {
    user: "david.k***@gmail.com",
    signupDate: "2024-01-08",
    plan: "Professional",
    status: "Paid",
    commission: "TWD 89",
    firstPayment: "2024-01-08",
  },
  {
    user: "lisa.m***@gmail.com",
    signupDate: "2024-01-05",
    plan: "Professional",
    status: "Suspended",
    commission: "TWD 0",
    firstPayment: "2024-01-05",
  },
];

const ReferralsTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Referrals
        </h2>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or number"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr className="border-b">
              <th className="p-3">User</th>
              <th className="p-3">Signup Date</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Commission</th>
              <th className="p-3">First Payment</th>
            </tr>
          </thead>
          <tbody>
            {mockReferrals.map((ref, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{ref.user}</td>
                <td className="p-3">{ref.signupDate}</td>
                <td className="p-3">
                  <StatusPill type={ref.plan} />
                </td>
                <td className="p-3">
                  <StatusPill type={ref.status} />
                </td>
                <td className="p-3 font-medium text-green-600">
                  {ref.commission}
                </td>
                <td className="p-3">{ref.firstPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralsTab;
