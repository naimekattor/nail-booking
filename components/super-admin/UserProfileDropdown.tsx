"use client";

import { CircleArrowUp, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FiChevronDown, FiUser, FiLock, FiMail, FiPhone } from "react-icons/fi";

type ModalType = "profile" | "password" | "email" | "number" | null;

interface UserProfileDropdownProps {
  onOpenModal: (modal: ModalType) => void;
}

const UserProfileDropdown = ({ onOpenModal }: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (modal: ModalType) => {
    onOpenModal(modal);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="text-right">
          <p className="font-semibold">Sajib ahmed</p>
          <p className="text-xs text-gray-500">sajib@gmail.com</p>
        </div>
        <Image
          src={"/images/team_img2.jpg"}
          alt="sajib"
          width={370}
          height={353}
          className="w-9 h-9 border-1 rounded-full"
        />
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border">
          <ul className="py-1">
            <li>
              <button
                onClick={() => handleSelect("profile")}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <CircleArrowUp /> Upgrade package
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("password")}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLock /> Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("email")}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiMail /> Change Email
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("number")}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut /> Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
