"use client";

import { useState } from "react";
import { FiGrid, FiBarChart2, FiLogOut } from "react-icons/fi"; // Example icons

const Sidebar = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-2">NailBooking</h1>
          <p className="text-sm text-gray-400 mb-10">Subscriber Portal</p>

          <nav className="space-y-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 bg-gray-700 rounded-lg text-white"
            >
              <FiGrid />
              <span>My Plan</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-lg"
            >
              <FiBarChart2 />
              <span>Affiliate Program</span>
            </a>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <p className="text-xs text-yellow-400">Current Plan</p>
            <p className="font-semibold">Professional Member</p>
          </div>
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 text-gray-400 hover:bg-gray-700 rounded-lg"
          >
            <FiLogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {isLogoutModalOpen && (
        <LogoutModal onClose={() => setLogoutModalOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
