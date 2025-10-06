"use client";

import ApplyModal from "@/components/subscriber/affiliate/modals/ApplyModal";
import WithdrawalModal from "@/components/subscriber/affiliate/modals/WithdrawalModal";
import OverviewTab from "@/components/subscriber/affiliate/OverviewTab";
import PayoutsTab from "@/components/subscriber/affiliate/PayoutsTab";
import ReferralsTab from "@/components/subscriber/affiliate/ReferralsTab";
import StatCard from "@/components/subscriber/affiliate/StatCard";
import { useState } from "react";

type AffiliateTab = "overview" | "referrals" | "payouts";

export default function AffiliatePage() {
  const [activeTab, setActiveTab] = useState<AffiliateTab>("overview");
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            onApply={() => setApplyModalOpen(true)}
            onWithdraw={() => setWithdrawalModalOpen(true)}
          />
        );
      case "referrals":
        return <ReferralsTab />;
      case "payouts":
        return <PayoutsTab />;
      default:
        return null;
    }
  };

  return (
    <div className=" min-h-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <StatCard
          title="Total Clicks"
          value="2,847"
          detail="10% click-to-signup rate"
        />
        <StatCard
          title="Total Conversions rate"
          value="1.5%"
          detail="+12 this month"
          trend="up"
        />
        <StatCard
          title="Total Referrals"
          value="284"
          detail="50% paid conversion rate"
        />
        <StatCard
          title="Total Earnings"
          value="TWD 89,470"
          detail="+TWD 12,638 this month"
          trend="up"
        />
      </div>
      <nav className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm max-w-max mb-6">
        {(["overview", "referrals", "payouts"] as AffiliateTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              activeTab === tab
                ? "bg-gray-800 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="animate-fade-in">{renderContent()}</div>

      {isApplyModalOpen && (
        <ApplyModal onClose={() => setApplyModalOpen(false)} />
      )}
      {isWithdrawalModalOpen && (
        <WithdrawalModal onClose={() => setWithdrawalModalOpen(false)} />
      )}
    </div>
  );
}
