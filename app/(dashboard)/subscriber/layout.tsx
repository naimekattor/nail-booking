import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-900 min-h-screen flex text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 bg-white text-gray-900">{children}</main>
    </div>
  );
}
