"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";


interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const { logout } = useAuthStore();
const router = useRouter();
  const signOut = async () => {
    try {
      // Sign out 
       logout();

      // Redirect after successful logout
      router.push("/"); // or "/login", "/signin", etc.
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Do you want to logout?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={ signOut}
            className="px-8 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:opacity-90"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
