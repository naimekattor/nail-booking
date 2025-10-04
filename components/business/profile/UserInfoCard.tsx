import {
  FiUser,
  FiPhone,
  FiGift,
  FiMail,
  FiUsers,
  FiEdit,
} from "react-icons/fi";
import Image from "next/image";

// Define the type for the user prop for type safety
interface User {
  name: string;
  id: string;
  avatarUrl: string;
  phone: string;
  birthday: string;
  email: string;
  gender: string;
  memberSince: string;
}

interface UserInfoCardProps {
  user: User;
  onEdit: () => void;
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="text-pink-400 mt-1" size={16} />
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const UserInfoCard = ({ user, onEdit }: UserInfoCardProps) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 sm:p-8 rounded-2xl shadow-sm border">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full border-4 border-white shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500 font-medium">ID: {user.id}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
        <InfoItem icon={FiPhone} label="Phone" value={user.phone} />
        <InfoItem icon={FiGift} label="Birthday" value={user.birthday} />
        <InfoItem icon={FiMail} label="Email" value={user.email} />
        <InfoItem icon={FiUser} label="Gender" value={user.gender} />
        <InfoItem
          icon={FiUsers}
          label="Member Since"
          value={user.memberSince}
        />
      </div>
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white px-3 py-1.5 rounded-lg border shadow-sm"
      >
        <FiEdit size={14} />
        Edit
      </button>
    </div>
  );
};

export default UserInfoCard;
