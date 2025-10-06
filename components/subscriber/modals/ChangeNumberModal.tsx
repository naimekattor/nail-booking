"use client";

import { FiArrowLeft, FiPhone, FiLock } from "react-icons/fi";

interface ModalProps {
  onClose: () => void;
}

const ChangeNumberModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Number</h2>
        <form className="space-y-4">
          {/* Enter Old Number */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Enter Old Number
            </label>
            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Number"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          {/* Enter Password */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Enter Password
            </label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          {/* New Email (Label from image seems like a typo, assuming it should be New Number) */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              New Number
            </label>
            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Number"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          {/* Confirm New Email (Assuming Confirm New Number) */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Confirm New Number
            </label>
            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Number"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeNumberModal;
