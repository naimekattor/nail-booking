interface StatusBadgeProps {
  status: "Failed" | "Issued";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block";

  if (status === "Failed") {
    return (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>
    );
  }
  if (status === "Issued") {
    return (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        Issued
      </span>
    );
  }

  return null;
};

export default StatusBadge;
