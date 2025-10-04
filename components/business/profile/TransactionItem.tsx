import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const TransactionItem = ({ transaction }: { transaction: any }) => {
  const isCredit = transaction.type === "credit";
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isCredit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isCredit ? <FiArrowUp /> : <FiArrowDown />}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            ${Math.abs(transaction.amount)}
          </p>
          <p className="text-xs text-gray-500">{transaction.description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-700">{transaction.date}</p>
        <p className="text-xs text-gray-500">Balance: ${transaction.balance}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
