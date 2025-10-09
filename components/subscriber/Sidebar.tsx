"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import to detect active route
import { FiGrid, FiBarChart2, FiLogOut, FiX } from "react-icons/fi";
import LogoutModal from "./modals/LogoutModal";

// Define props for state management from the parent layout
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { href: "/subscriber", label: "My Plan", icon: FiGrid },
    {
      href: "/subscriber/affiliate",
      label: "Affiliate Program",
      icon: FiBarChart2,
    },
  ];

  return (
    <>
      {/* Overlay for mobile view - closes the sidebar when clicked */}
      <div
        className={`fixed inset-0 bg-[#FAFAFA]  bg-opacity-50 z-30 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 bg-[#FAFAFA] shadow-lg  flex flex-col justify-between p-6 z-40 w-64
                   transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-0
                   ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-lg font-semibold">
                NailBooking Subscriber Portal
              </h1>
              <p className="text-sm text-gray-400">Subscriber Portal</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <FiX size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose} // Close sidebar on mobile navigation
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-[#C06EF3] text-background" : ""
                  }`}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="p-4  rounded-lg text-center">
            <p className="text-xs ">Current Plan</p>
            <p className="font-semibold">Professional Member</p>
            <p className=" text-[#717182] text-sm">User Id : 12345678</p>
          </div>
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 text-[#E7000B]  cursor-pointer rounded-lg"
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
