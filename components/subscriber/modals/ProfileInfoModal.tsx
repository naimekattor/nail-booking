"use client";

interface ModalProps {
  onClose: () => void;
}

const ProfileInfoModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4 pt-20">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg">
        <h3 className="font-bold text-lg text-gray-800">
          Basic profile information's
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Your payment information is protected with SSL encryption. We do not
          save your credit card details.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Administrator name
            </label>
            <input
              type="text"
              defaultValue="sajib ahmed"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border-transparent rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Admin picture
            </label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfoModal;
