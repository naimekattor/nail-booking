"use client";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link"; // Import Link for navigation

// Icons from 'react-icons'
import {
  FiSearch,
  FiFilter,
  FiUpload,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// --- Reusable Delete Modal Component ---
const DeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-6">
          Do you want to Delete Now?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-8 py-2 border border-pink-500 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-8 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

interface Invoice {
  id: string;
  invoiceNumber: string;
  ecpayId?: string;
  code?: string;
  merchantOrderNo: string;
  tradeId: string;
  buyerName: string;
  buyerEmail: string;
  taxId?: string;
  amount: number;
  tax: number;
  status: "Reissued" | "Created" | "Failed";
  carrier?: string;
  createdDate: string;
  issuedDate?: string;
}

const initialInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    invoiceNumber: "INV-2024-001",
    ecpayId: "AA-12345678",
    code: "Code: 1234",
    merchantOrderNo: "ORD-20240115-001",
    tradeId: "Trade: 2024011512345678",
    buyerName: "Acme Corporation Ltd.",
    buyerEmail: "billing@acme.com",
    taxId: "Tax ID: 12345678",
    amount: 509.25,
    tax: 24.25,
    status: "Reissued",
    createdDate: "2024-01-15 14:30:25",
    issuedDate: "2024-01-15 14:31:15",
  },
  {
    id: "INV-2024-002",
    invoiceNumber: "INV-2024-002",
    merchantOrderNo: "ORD-20240120-002",
    tradeId: "Trade: 2024012012345679",
    buyerName: "TechStart Inc.",
    buyerEmail: "finance@techstart.com",
    amount: 313.95,
    tax: 14.95,
    status: "Created",
    carrier: "Carrier: mobile",
    createdDate: "2024-01-20 10:15:00",
  },
  {
    id: "INV-2024-003",
    invoiceNumber: "INV-2024-003",
    merchantOrderNo: "ORD-20240118-003",
    tradeId: "Trade: 2024011812345680",
    buyerName: "Global Solutions Ltd",
    buyerEmail: "payments@global.com",
    taxId: "Tax ID: 87654321",
    amount: 1312.5,
    tax: 62.5,
    status: "Failed",
    createdDate: "2024-01-18 16:45:50",
  },
];

const StatusBadge: React.FC<{
  status: "Reissued" | "Created" | "Failed";
  carrier?: string;
}> = ({ status, carrier }) => {
  const baseClasses = "px-3 py-1 text-sm rounded-full inline-flex items-center";
  if (status === "Reissued")
    return (
      <div className={`${baseClasses} bg-gray-200 text-gray-800`}>Reissued</div>
    );
  if (status === "Created")
    return (
      <div className={`${baseClasses} bg-blue-100 text-blue-800`}>Created</div>
    );
  if (status === "Failed")
    return (
      <div className={`${baseClasses} bg-red-100 text-red-800`}>Failed</div>
    );
  return null;
};

const InvoicesPage: NextPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setInvoices(invoices.filter((invoice) => invoice.id !== itemToDelete));
      setItemToDelete(null);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Electronic Invoices</title>
      </Head>
      <div className="min-h-screen  font-sans">
        <header className="mb-6">
          <div className="flex shrink-0 w-fit bg-accent rounded-full p-1">
            <Link
              href={"/super-admin/billing-invoices/"}
              className="px-4 py-2 text-lg font-semibold text-gray-800 bg-white rounded-full cursor-pointer"
            >
              Electronic Invoices
            </Link>
            <Link
              href="/super-admin/billing-invoices/creation-logs"
              className="px-4 py-2 text-lg font-semibold text-gray-500 hover:text-gray-800"
            >
              Creation Logs
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 flex-1">
              <div className="relative w-1/3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
                {" "}
                <FiFilter /> <span>Filter</span>{" "}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
                {" "}
                <FiUpload /> <span>Export CSV</span>{" "}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-sm text-gray-600">
                  <th className="p-4 font-medium">Invoice Number</th>
                  <th className="p-4 font-medium">Merchant Order No.</th>
                  <th className="p-4 font-medium">Buyer Information</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Created / Issued</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-4 align-top">
                      <div>{invoice.invoiceNumber}</div>
                      {invoice.ecpayId && (
                        <div className="text-xs text-gray-500">
                          {invoice.ecpayId}
                        </div>
                      )}
                      {invoice.code && (
                        <div className="text-xs text-blue-500">
                          {invoice.code}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div>{invoice.merchantOrderNo}</div>
                      <div className="text-xs text-gray-500">
                        {invoice.tradeId}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div>{invoice.buyerName}</div>
                      <div className="text-xs text-gray-500">
                        {invoice.buyerEmail}
                      </div>
                      {invoice.taxId && (
                        <div className="text-xs text-blue-500">
                          {invoice.taxId}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div>NT$ {invoice.amount.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Tax: NT$ {invoice.tax.toFixed(2)} (5%)
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex flex-col space-y-1">
                        <StatusBadge status={invoice.status} />
                        {invoice.carrier && (
                          <span className="text-xs text-gray-500">
                            {invoice.carrier}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div>{invoice.createdDate}</div>
                      {invoice.issuedDate && (
                        <div className="text-xs text-green-600">
                          Issued: {invoice.issuedDate}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <button
                        onClick={() => handleDeleteClick(invoice.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              {" "}
              <span>Rows per page:</span>{" "}
              <select className="border rounded-md p-1 bg-gray-50">
                {" "}
                <option>10</option>{" "}
              </select>{" "}
            </div>
            <div className="flex items-center space-x-4">
              {" "}
              <span>Page 1 of 1 ({invoices.length} total records)</span>{" "}
              <div className="flex items-center space-x-1">
                {" "}
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-md">
                  {" "}
                  <FiChevronLeft />{" "}
                </button>{" "}
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-md">
                  {" "}
                  <FiChevronRight />{" "}
                </button>{" "}
              </div>{" "}
            </div>
          </div>
        </div>

        {showModal && (
          <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
        )}
      </div>
    </>
  );
};

export default InvoicesPage;
