"use client";

import ChangePasswordModal from "@/components/subscriber/modals/ChangePasswordModal";
import ProfileInfoModal from "@/components/subscriber/modals/ProfileInfoModal";
import { useState } from "react";

import SubscriptionTab from "@/components/subscriber/SubscriptionTab";
import InvoicesTab from "@/components/subscriber/InvoicesTab";
import ChangeEmailModal from "@/components/subscriber/modals/ChangeEmailModal";
import ChangeNumberModal from "@/components/subscriber/modals/ChangeNumberModal";

// For type safety with modal states
type ModalType = "profile" | "password" | "email" | "number" | null;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"subscription" | "invoices">(
    "subscription"
  );
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const renderModal = () => {
    switch (activeModal) {
      case "profile":
        return <ProfileInfoModal onClose={() => setActiveModal(null)} />;
      case "password":
        return <ChangePasswordModal onClose={() => setActiveModal(null)} />;
      case "email":
        return <ChangeEmailModal onClose={() => setActiveModal(null)} />;
      case "number":
        return <ChangeNumberModal onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">My Plan</h2>
        <p className="text-gray-500">Professional Member ⭐</p>
      </div> */}

      <div className="mt-6 border-b border-gray-200">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab("subscription")}
            className={`py-2 px-1 font-semibold ${
              activeTab === "subscription"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Subscription
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`py-2 px-1 font-semibold ${
              activeTab === "invoices"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Invoices
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === "subscription" ? <SubscriptionTab /> : <InvoicesTab />}
      </div>

      {renderModal()}
    </div>
  );
}
