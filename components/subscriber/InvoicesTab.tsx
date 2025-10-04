import { FiInfo, FiSearch } from "react-icons/fi";
import StatusBadge from "../ui/StatusBadge";

const mockInvoices = [
  {
    id: "AA12345670",
    date: "2024-01-15",
    period: "2024/1/15 - 2024/2/14",
    amount: "TWD 880",
    issuedTo: "Beautiful Nails Studio",
    status: "Failed",
  },
  {
    id: "AA12345677",
    date: "2023-12-15",
    period: "2023/12/15 - 2024/1/14",
    amount: "TWD 880",
    issuedTo: "Beautiful Nails Studio",
    status: "Issued",
  },
  {
    id: "AA12345679",
    date: "2023-11-15",
    period: "2023/11/15 - 2023/12/14",
    amount: "TWD 880",
    issuedTo: "Beautiful Nails Studio",
    status: "Issued",
  },
];

const InvoicesTab = () => {
  return (
    <div>
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 mb-6">
        <FiInfo className="text-blue-500 text-xl mt-1 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          <strong>Taiwan E-Invoice Notice:</strong> Electronic invoices are
          automatically issued after each successful payment and sent to your
          registered email.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Invoice History</h3>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by invoice number"
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Invoice Number</th>
              <th className="px-6 py-3">Issue Date</th>
              <th className="px-6 py-3">Service Period</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Issued To</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4">{invoice.date}</td>
                <td className="px-6 py-4">{invoice.period}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4">{invoice.issuedTo}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={invoice.status as "Failed" | "Issued"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTab;
