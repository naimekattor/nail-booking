"use client";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// Icons from 'react-icons'
import {
  FiSearch,
  FiFilter,
  FiUpload,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// --- Reusable Delete Modal Component ---
const DeleteModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

interface LogEntry {
  id: string;
  timestamp: string;
  orderNo: string;
  action: string;
  status: "success" | "failed";
  message: string;
  subMessage: string;
}

const initialLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2024-01-15 14:30:25",
    orderNo: "ORD-20240115-001",
    action: "Invoice Created",
    status: "success",
    message: "Invoice created successfully",
    subMessage: "Invoice draft created with all required information",
  },
  {
    id: "log-2",
    timestamp: "2024-01-15 14:31:15",
    orderNo: "ORD-20240115-001",
    action: "Invoice Issued",
    status: "success",
    message: "Electronic invoice issued successfully",
    subMessage: "",
  },
  {
    id: "log-3",
    timestamp: "2024-01-20 10:15:00",
    orderNo: "ORD-20240120-002",
    action: "Invoice Created",
    status: "success",
    message: "Invoice created, waiting for payment confirmation",
    subMessage: "Invoice created with mobile carrier",
  },
  {
    id: "log-4",
    timestamp: "2024-01-18 16:45:30",
    orderNo: "ORD-20240118-003",
    action: "Invoice Creation Failed",
    status: "failed",
    message: "Failed to create electronic invoice",
    subMessage: "Invalid buyer tax ID number format",
  },
  {
    id: "log-5",
    timestamp: "2024-01-18 16:46:15",
    orderNo: "ORD-20240118-003",
    action: "Retry Invoice Creation",
    status: "failed",
    message: "Retry failed - same validation error",
    subMessage: "Buyer tax ID validation failed again",
  },
];

const StatusBadge: React.FC<{ status: "success" | "failed" }> = ({
  status,
}) => {
  if (status === "success") {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 text-white rounded-full text-xs font-medium">
        <FiCheckCircle />
        <span>success</span>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
      <FiXCircle />
      <span>failed</span>
    </div>
  );
};

const CreationLogsPage: NextPage = () => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setLogs(logs.filter((log) => log.id !== itemToDelete));
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
        <title>Creation Logs</title>
      </Head>
      <div className=" min-h-screen p-8 font-sans">
        <header className="mb-6">
          <div className="flex bg-accent shrink-0 w-fit rounded-full p-1">
            <Link
              href="/super-admin/billing-invoices"
              className="px-4 py-2 text-lg font-semibold text-gray-500 hover:text-gray-800"
            >
              Electronic Invoices
            </Link>
            <h1 className="px-4 py-2 text-lg font-semibold text-gray-800 border-b-2 bg-white rounded-full cursor-pointer">
              Creation Logs
            </h1>
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
                  <th className="p-4 font-medium">Timestamp</th>
                  <th className="p-4 font-medium">Order No.</th>
                  <th className="p-4 font-medium">Action</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Message</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-4 text-gray-500">{log.timestamp}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700">
                        {log.orderNo}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {log.action}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="p-4">
                      <div>{log.message}</div>
                      <div className="text-xs text-gray-500">
                        {log.subMessage}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteClick(log.id)}
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
              <span>Page 1 of 1 ({logs.length} total records)</span>{" "}
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

export default CreationLogsPage;
