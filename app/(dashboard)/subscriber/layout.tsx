"use client";

import DashboardHeader from "@/components/subscriber/DashboardHeader";
import ChangeEmailModal from "@/components/subscriber/modals/ChangeEmailModal";
import ChangePasswordModal from "@/components/subscriber/modals/ChangePasswordModal";
import LogoutModal from "@/components/subscriber/modals/LogoutModal";
import ProfileInfoModal from "@/components/subscriber/modals/ProfileInfoModal";
import Sidebar from "@/components/subscriber/Sidebar";
import { useState } from "react";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const handleOpenModal = (modal: string | null) => {
    setActiveModal(modal);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          handleOpenModal={handleOpenModal}
        />

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {activeModal === "profile" && (
        <ProfileInfoModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "password" && (
        <ChangePasswordModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "email" && (
        <ChangeEmailModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "logout" && (
        <LogoutModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
