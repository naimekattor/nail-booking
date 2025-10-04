"use client";

import { useState } from "react";

interface WithdrawalModalProps {
  onClose: () => void;
}

const WithdrawalModal = ({ onClose }: WithdrawalModalProps) => {
  const [transferType, setTransferType] = useState<"card" | "bank">("card");

  const CardForm = () => (
    <>
      <div>
        <label className="text-sm font-medium">Cardholder Name</label>
        <input type="text" placeholder="Enter here" />
      </div>
      <div>
        <label className="text-sm font-medium">Card Number *</label>
        <input type="text" placeholder="1234 5678 9012 3456" />
      </div>
      <div>
        <label className="text-sm font-medium">CVV *</label>
        <input type="text" placeholder="123" />
      </div>
      <div>
        <label className="text-sm font-medium">Bank Name</label>
        <input type="text" placeholder="YY" />
      </div>
      <div>
        <label className="text-sm font-medium">Branch Name</label>
        <input type="text" placeholder="MM" />
      </div>
      <div>
        <label className="text-sm font-medium">Withdrawal Amount</label>
        <input type="text" placeholder="Enter here" />
      </div>
    </>
  );

  const BankForm = () => (
    <>
      <div>
        <label className="text-sm font-medium">Bank Name</label>
        <input type="text" placeholder="Enter here" />
      </div>
      <div>
        <label className="text-sm font-medium">Branch Name</label>
        <input type="text" placeholder="1234 5678 9012 3456" />
      </div>
      <div>
        <label className="text-sm font-medium">Account Number</label>
        <input type="text" placeholder="123" />
      </div>
      <div>
        <label className="text-sm font-medium">Account Type</label>
        <input type="text" placeholder="Enter here" />
      </div>
      <div>
        <label className="text-sm font-medium">Branch Name</label>
        <input type="text" placeholder="MM" />
      </div>
      <div>
        <label className="text-sm font-medium">Withdrawal amount</label>
        <input type="text" placeholder="Enter here" />
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-800">Withdrawal request</h2>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Local fund transfer. Your payment information is protected with SSL
          encryption. We do not store your credit card details.
        </p>

        <div className="flex items-center p-1 bg-gray-100 rounded-lg max-w-max mb-6">
          <button
            onClick={() => setTransferType("card")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md ${
              transferType === "card"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Card Transfer
          </button>
          <button
            onClick={() => setTransferType("bank")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md ${
              transferType === "bank"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Bank Transfer
          </button>
        </div>

        <form className="space-y-4 [&_input]:w-full [&_input]:p-2 [&_input]:bg-gray-100 [&_input]:border-transparent [&_input]:rounded-md [&_input]:mt-1">
          {transferType === "card" ? <CardForm /> : <BankForm />}
        </form>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
