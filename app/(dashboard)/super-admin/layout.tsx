"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // replace with clsx if preferred
import { Menu } from "lucide-react";

// Define menu items
const menuItems = [
  { label: "Subscribers", href: "/super-admin/subscribers" },
  { label: "Subscription Plans", href: "/super-admin/subscription-plans" },
  { label: "Business Analytics", href: "/super-admin/business-analytics" },
  { label: "Customer Management", href: "/super-admin/customers" },
  {
    label: "Affiliates Center",
    children: [
      { label: "Affiliates", href: "/super-admin/affiliates" },
      { label: "Commissions", href: "/super-admin/commissions" },
      { label: "Payouts", href: "/super-admin/payouts" },
    ],
  },
  { label: "Billing & Invoices", href: "/super-admin/billing-invoices" },
  { label: "EDM Auto-Send Settings", href: "/super-admin/edm-settings" },
  { label: "Audit Logs", href: "/super-admin/audit-logs" },
  { label: "Role Management", href: "/super-admin/role-management" },
];

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-transform transform bg-black/50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg overflow-y-auto transition-transform transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">B2B SaaS Platform</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="text-xs font-semibold text-gray-400 uppercase mt-4">
                  {item.label}
                </p>
                <div className="ml-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm",
                        pathname === child.href
                          ? "bg-[#C06EF3] text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm",
                  pathname === item.href
                    ? "bg-[#C06EF3] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t">
          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm flex-shrink-0">
          <div className="flex items-center lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
            Super Administrator
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">super@example.com</span>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
