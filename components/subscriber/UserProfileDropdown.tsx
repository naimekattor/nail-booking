"use client";

import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronDown, FiUser, FiLock, FiMail, FiPhone } from "react-icons/fi";
type ModalType = "profile" | "password" | "email" | "logout" | null;

// Shape of the profile endpoint response
interface ProfileData {
  full_name?: string;
  profile_image_url?: string;
  email?: string;
  // add any other fields you need
}

interface UserProfileDropdownProps {
  onOpenModal: (modal: ModalType) => void;
}

const UserProfileDropdown = ({ onOpenModal }: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData,setUserData]=useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setUser}=useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient<ProfileData>("accounts/profile/", {
          method: "GET",
          auth: true, // uses access_token from localStorage
        });
        setUserData(res);
        setUser(res);

      } catch (err: any) {
        console.error("Failed to load profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  const imageUrl = userData?.profile_image_url || "/images/avatar.jpg";
  const name =
    userData?.full_name || "Name Not Set";
  

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
          <p className="font-semibold">{name}</p>
          {/* <p className="text-xs text-gray-500">{email}</p> */}
        </div>
        <Image
          src={imageUrl}
          alt="sajib"
          width={370}
          height={353}
          className="w-9 h-9 border-1 rounded-full"
        />
        {loading && (
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 border-t-transparent animate-spin" />
          )}

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
                <FiUser />
                Change Basic Info
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
                onClick={() => handleSelect("logout")}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-[14px] h-[14px]" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {}
    </div>
  );
};

export default UserProfileDropdown;
