interface StatusPillProps {
  type: string;
}

const StatusPill = ({ type }: StatusPillProps) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block";

  const typeStyles: Record<string, string> = {
    Paid: "bg-blue-100 text-blue-800",
    Active: "bg-green-100 text-green-800",
    Suspended: "bg-red-100 text-red-800",
    Free: "bg-gray-200 text-gray-800",
    Professional: "bg-gray-800 text-white",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Cancelled: "bg-orange-100 text-orange-800",
    Completed: "bg-green-100 text-green-800",
  };

  const classes = typeStyles[type] || "bg-gray-100 text-gray-800";

  return <span className={`${baseClasses} ${classes}`}>{type}</span>;
};

export default StatusPill;
