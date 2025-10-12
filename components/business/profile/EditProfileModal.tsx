import { FiX } from "react-icons/fi";

const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Personal Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form className="p-6 space-y-4 [&_label]:text-sm [&_label]:font-medium [&_label]:text-gray-700 [&_input]:w-full [&_input]:p-2 [&_input]:bg-gray-100 [&_input]:border-transparent [&_input]:rounded-md [&_input]:mt-1">
          <div>
            <label>Name</label>
            <input type="text" placeholder="Enter here" />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="text" defaultValue="19/12/2019" />
          </div>
          <div>
            <label>Gender</label>
            <select className="w-full p-2 bg-gray-100 border-transparent rounded-md mt-1">
              <option>Select one</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Number</label>
            <input type="text" defaultValue="017734346453103" />
          </div>
          <div>
            <label>Picture</label>
            <div className="flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-l-md hover:bg-gray-300"
              >
                Choose file
              </label>
              <span className="border border-l-0 p-2 rounded-r-md bg-gray-100 text-gray-500 text-sm truncate w-full">
                apdfpkp'adkf.jpeg
              </span>
              <input id="file-upload" type="file" className="hidden" />
            </div>
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Enter here" />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-white rounded-md hover:bg-gray-700 font-semibold"
            >
              Grant Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
