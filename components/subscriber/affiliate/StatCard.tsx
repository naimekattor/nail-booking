import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: string;
  detail: string;
  trend?: "up" | "down";
}

const StatCard = ({ title, value, detail, trend }: StatCardProps) => {
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 my-2">{value}</p>
      <div
        className={`flex items-center text-xs ${
          trend ? trendColor : "text-gray-500"
        }`}
      >
        {trend &&
          (trend === "up" ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <FiTrendingDown className="mr-1" />
          ))}
        <span>{detail}</span>
      </div>
    </div>
  );
};

export default StatCard;
