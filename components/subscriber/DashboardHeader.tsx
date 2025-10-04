"use client";

import { usePathname } from "next/navigation";
import UserProfileDropdown from "./UserProfileDropdown";
import { FiMenu } from "react-icons/fi"; // Import menu icon

const titleMap: { [key: string]: string } = {
  "/dashboard": "My Plan",
  "/dashboard/affiliate": "Affiliate Program",
};

// Add the new prop to the interface
interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

const DashboardHeader = ({ onMenuToggle }: DashboardHeaderProps) => {
  const pathname = usePathname();
  const title = titleMap[pathname] || "Dashboard";

  // In a real-world app with complex modal interactions, you'd use a state manager
  // (like Zustand or React Context) instead of passing this function down.
  const handleOpenModal = (modal: any) => {
    console.warn(
      "Modal opening should be handled by a global state manager.",
      modal
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 p-4 sm:p-6 lg:p-8 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - visible only on smaller screens */}
          <button
            onClick={onMenuToggle}
            className="text-gray-600 hover:text-gray-900 lg:hidden" // Hide on large screens and up
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <UserProfileDropdown onOpenModal={handleOpenModal} />
      </div>
    </header>
  );
};

export default DashboardHeader;
