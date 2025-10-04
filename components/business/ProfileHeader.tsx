import { FiEdit } from "react-icons/fi"; // Just an example icon

interface ProfileHeaderProps {
  businessName: string;
}

const ProfileHeader = ({ businessName }: ProfileHeaderProps) => {
  return (
    <header className="bg-white p-4 sm:p-6 border-b border-gray-200 flex items-center gap-4">
      <span className="font-semibold text-gray-500">Profile</span>
      <span className="text-gray-300">/</span>
      <h1 className="text-xl font-bold text-gray-800">{businessName}</h1>
    </header>
  );
};

export default ProfileHeader;
