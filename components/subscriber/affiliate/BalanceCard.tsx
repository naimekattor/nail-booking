import { IconType } from "react-icons";
import { FiTrendingUp } from "react-icons/fi";

interface BalanceCardProps {
  title: string;
  value: string;
  icon: IconType;
  detail?: string;
  trend?: "up" | "down";
  actionText?: string;
  onAction?: () => void;
}

const BalanceCard = ({
  title,
  value,
  icon: Icon,
  detail,
  trend,
  actionText,
  onAction,
}: BalanceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 my-2">{value}</p>
        </div>
        <Icon className="text-3xl text-gray-400" />
      </div>
      {detail && (
        <div
          className={`flex items-center text-xs mt-2 ${
            trend === "up" ? "text-green-500" : "text-gray-500"
          }`}
        >
          {trend === "up" && <FiTrendingUp className="mr-1" />}
          <span>{detail}</span>
        </div>
      )}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="w-full mt-4 bg-secondary text-white font-semibold py-2 rounded-lg hover:bg-[var(--secondaryHover)]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default BalanceCard;
