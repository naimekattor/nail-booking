import FormInput from "@/components/ui/FormInput";
import { FiArrowLeft, FiLock } from "react-icons/fi";

interface ChangePasswordModalProps {
  onClose: () => void;
}

const ChangePasswordModal = ({ onClose }: ChangePasswordModalProps) => {
  return (
    // Full-screen overlay
    <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50 p-4">
      {/* Modal content */}
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft size={20} />
          Back
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Change Password
        </h2>

        <form className="space-y-6">
          <FormInput
            id="old_password"
            label="Old password"
            type="password"
            placeholder="Enter Password"
            Icon={FiLock}
          />
          <FormInput
            id="new_password"
            label="New password"
            type="password"
            placeholder="Enter Password"
            Icon={FiLock}
          />
          <FormInput
            id="confirm_new_password"
            label="Confirm new password"
            type="password"
            placeholder="Enter Password"
            Icon={FiLock}
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
