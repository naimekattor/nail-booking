"use client";

import BalanceSection from "@/components/business/profile/BalanceSection";
import BookingsSection from "@/components/business/profile/BookingsSection";
import EditProfileModal from "@/components/business/profile/EditProfileModal";
import UserInfoCard from "@/components/business/profile/UserInfoCard";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { FiCalendar, FiDollarSign } from "react-icons/fi";

// MOCK USER DATA: In a real app, this would come from a session or API call.
const mockUser = {
  name: "Alex Chen",
  id: "USER-LNE",
  avatarUrl: "https://via.placeholder.com/100",
  phone: "+1 (555) 123-4567",
  birthday: "April 22, 1992",
  email: "sajibahamed@gmail.com",
  gender: "Other",
  memberSince: "Oct 2024",
};

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session?.user);
  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name || "Unknown",
        image: session.user.image || "",
        avatarUrl: session.user.image || "",
        email: session.user.email || "",
        phone: "",
        birthday: "",
        gender: "",
        memberSince: "",
      }
    : null;

  const [activeTab, setActiveTab] = useState<"bookings" | "balance">(
    "bookings"
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <div className="space-y-8 h-full">
      {user && (
        <UserInfoCard user={user} onEdit={() => setEditModalOpen(true)} />
      )}

      {/* Main Tab Controls */}
      <div className="flex items-center p-1 bg-gray-100 rounded-lg max-w-max mx-auto sm:mx-0">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === "bookings"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-600"
          }`}
        >
          <FiCalendar />
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("balance")}
          className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === "balance"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-600"
          }`}
        >
          <FiDollarSign />
          Balance
        </button>
      </div>

      {/* Conditional Content */}
      <div className="animate-fade-in">
        {activeTab === "bookings" ? <BookingsSection /> : <BalanceSection />}
      </div>

      {isEditModalOpen && (
        <EditProfileModal onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
}
