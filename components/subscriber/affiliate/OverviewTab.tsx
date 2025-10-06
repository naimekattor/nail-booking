import { FiTrendingUp, FiCopy, FiDollarSign, FiInfo } from "react-icons/fi";
import { FaMoneyBillWave, FaBalanceScale, FaRegClock } from "react-icons/fa";
import StatCard from "./StatCard";
import BalanceCard from "./BalanceCard";
import CommissionFlow from "./CommissionFlow";

interface OverviewTabProps {
  onApply: () => void;
  onWithdraw: () => void;
}

const OverviewTab = ({ onApply, onWithdraw }: OverviewTabProps) => {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          {/* This could be a breadcrumb in a real app */}
          <h1 className="text-2xl font-bold text-gray-800">
            Affiliate Dashboard
          </h1>
          <p className="text-gray-500">Welcome to your affiliate center.</p>
        </div>
        <button
          onClick={onApply}
          className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-gray-700 transition-colors"
        >
          Apply for Affiliate
        </button>
      </div>

      {/* Commission Structure */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiDollarSign /> Commission Structure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
            <p className="text-gray-600">Commission Rate</p>
            <p className="text-4xl font-bold text-green-600 my-2">10%</p>
            <p className="text-sm text-gray-500">
              Of Professional plan subscription price
            </p>
            <span className="inline-block mt-4 text-xs font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
              30-day attribution
            </span>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 flex flex-col justify-center text-center">
            <p className="text-gray-600">Commission per Referral:</p>
            <p className="text-3xl font-bold text-blue-600 my-2">TWD 89</p>
            <p className="text-xs text-gray-500">
              Formula: TWD 890 * 10% = TWD 89
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-center">
            <p className="text-gray-600 mb-2">Your Referral Link</p>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value="https://nailbooking.com/r/sarah-j-2024"
                className="w-full bg-white border border-r-0 border-gray-300 rounded-l-md px-3 py-2 text-sm"
              />
              <button className="bg-gray-200 p-3 rounded-r-md text-gray-600 hover:bg-gray-300">
                <FiCopy />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard
          title="Available Balance"
          value="TWD 12,850"
          icon={FaMoneyBillWave}
          onAction={onWithdraw}
          actionText="Request Withdrawal"
        />
        <BalanceCard
          title="Pending Balance"
          value="TWD 5,230"
          icon={FaRegClock}
          detail="Available on 10th of next month"
        />
        <BalanceCard
          title="This Month"
          value="TWD 12,638"
          icon={FaBalanceScale}
          detail="+142% from last month"
          trend="up"
        />
      </div>

      {/* How it works */}
      <div className="bg-white p-6 rounded-lg shadow-sm text-sm">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FiInfo /> How it works:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Share your referral link with potential customers</li>
          <li>
            Earn 10% commission (TWD 89) for each successful paid conversion
          </li>
          <li>Minimum withdrawal amount: TWD 1,000</li>
          <li>Payments processed monthly on the 10th</li>
        </ul>
      </div>

      <CommissionFlow />
    </div>
  );
};

export default OverviewTab;
