"use client";

import { useState } from "react";
import TransactionItem from "./TransactionItem";

// MOCK TRANSACTIONS DATA
const mockTransactions = [
  {
    id: 1,
    amount: -50,
    type: "debit" as const,
    description: "Store available credits 'company'",
    date: "Nov 22, 2024",
    balance: 145,
  },
  {
    id: 2,
    amount: 50,
    type: "credit" as const,
    description: "Store available credits 'company'",
    date: "Nov 22, 2024",
    balance: 145,
  },
  {
    id: 3,
    amount: 100,
    type: "credit" as const,
    description: "Account top-up from technician",
    date: "Nov 22, 2024",
    balance: 210,
  },
];

const mockStoreWise = [
  {
    id: 1,
    amount: 50,
    type: "credit" as const,
    description: "Credit added from technician/ltd",
    date: "Dec 20, 2024",
    balance: 145,
  },
  // ... more store-wise specific transactions
];

const BalanceSection = () => {
  const [activeBalanceTab, setActiveBalanceTab] = useState<
    "transactions" | "storeWise"
  >("transactions");

  const dataToShow =
    activeBalanceTab === "transactions" ? mockTransactions : mockStoreWise;

  return (
    <div className="min">
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
        <h3 className="text-sm text-gray-500">Total Credit</h3>
        <p className="text-3xl font-bold text-gray-800">$145</p>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveBalanceTab("storeWise")}
          className={`py-2 text-sm font-semibold ${
            activeBalanceTab === "storeWise" ? "text-pink-500" : "text-gray-500"
          }`}
        >
          Store wise
        </button>
        <button
          onClick={() => setActiveBalanceTab("transactions")}
          className={`py-2 text-sm font-semibold ${
            activeBalanceTab === "transactions"
              ? "text-pink-500"
              : "text-gray-500"
          }`}
        >
          Transactions
        </button>
      </div>

      <div className="border-t">
        {dataToShow.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default BalanceSection;
