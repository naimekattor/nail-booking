"use client"; // This must be a client component to manage state

import DashboardHeader from "@/components/subscriber/DashboardHeader";
import Sidebar from "@/components/subscriber/Sidebar";
import { useState } from "react";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* 
        The Sidebar now receives state to control its visibility and a function to close it.
        This is crucial for mobile responsiveness.
      */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 
          The Header receives a function to toggle the sidebar, 
          which will be used by the hamburger menu on small screens.
        */}
        <DashboardHeader
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
