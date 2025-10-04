import { FiDollarSign } from "react-icons/fi";

const CommissionFlow = () => {
  const steps = [
    {
      title: "1. Total Earned",
      description: "All approved commissions ever earned by the affiliate",
    },
    {
      title: "2. Available for withdrawal",
      description: "Commissions waiting for admin approval",
    },
    {
      title: "3. Payout request",
      description: "Approved commissions ready for withdrawal",
    },
    {
      title: "4. Fund Transferred",
      description: "Commissions already paid out to affiliate",
    },
  ];
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiDollarSign /> Commission Flow Explanation
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        {steps.map((step) => (
          <div key={step.title}>
            <h4 className="font-bold text-gray-900">{step.title}</h4>
            <p className="text-gray-600 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionFlow;
