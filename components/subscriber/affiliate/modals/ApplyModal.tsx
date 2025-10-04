interface ApplyModalProps {
  onClose: () => void;
}

const ApplyModal = ({ onClose }: ApplyModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Do you want to do Affiliate Marketing?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-10 py-2 border border-pink-500 text-gray-700 rounded-md hover:bg-gray-100 font-semibold"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-10 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 font-semibold"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
