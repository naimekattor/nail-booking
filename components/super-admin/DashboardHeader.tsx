"use client";

import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import UserProfileDropdown from "./UserProfileDropdown";
import { Menu } from "lucide-react";

const titleMap: { [key: string]: string } = {
  "/super-admin/": "Subscribers",
  "/super-admin/subscription-plans": "Subscription Plans",
  // Add other titles as needed
};

// Define the type for your modals
type ModalType = "profile" | "password" | "email" | "number" | null;

// Update the props interface to accept the new function from the layout
interface DashboardHeaderProps {
  onMenuToggle: () => void;
  onOpenModal: (modal: ModalType) => void;
}

const DashboardHeader = ({
  onMenuToggle,
  onOpenModal,
}: DashboardHeaderProps) => {
  const pathname = usePathname();
  const title = titleMap[pathname] || "Dashboard";

  // The local `activeModal` state is now REMOVED from this component.

  return (
    <header className=" sticky top-0 z-30 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="text-gray-600 hover:text-gray-900 lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>

        {/* Pass the onOpenModal function directly to the dropdown */}
        <UserProfileDropdown onOpenModal={onOpenModal} />
      </div>
    </header>
  );
};

export default DashboardHeader;
