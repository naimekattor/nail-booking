"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Banknote,
  ChartColumnIncreasing,
  DollarSign,
  FileTerminal,
  Mail,
  Menu,
  Percent,
  Receipt,
  Settings,
  Shield,
  UserCheck,
  Users,
  Warehouse,
  LogOut,
} from "lucide-react";

// Import your page-level components
import DashboardHeader from "@/components/super-admin/DashboardHeader";
import ChangePasswordModal from "@/components/super-admin/modals/ChangePasswordModal";
import ChangeEmailModal from "@/components/super-admin/modals/ChangeEmailModal";

// Define the type for your modals
type ModalType = "profile" | "password" | "email" | "number" | null;

// The menu items array remains the same
const menuItems = [
  // ... your existing menuItems array
  { label: "Subscribers", href: "/super-admin/", icon: Users },
  {
    label: "Subscription Plans",
    href: "/super-admin/subscription-plans",
    icon: Settings,
  },
  {
    label: "Business Analytics",
    href: "/super-admin/business-analytics",
    icon: ChartColumnIncreasing,
  },
  {
    label: "Customer Management",
    href: "/super-admin/customers",
    icon: Warehouse,
  },
  {
    label: "Affiliates Center",
    icon: DollarSign,
    children: [
      {
        label: "Affiliates",
        href: "/super-admin/affiliates",
        icon: UserCheck,
      },
      {
        label: "Commissions",
        href: "/super-admin/commissions",
        icon: Percent,
      },
      { label: "Payouts", href: "/super-admin/payouts", icon: Banknote },
    ],
  },
  {
    label: "Billing & Invoices",
    href: "/super-admin/billing-invoices",
    icon: Receipt,
  },
  {
    label: "EDM Auto-Send Settings",
    href: "/super-admin/edm-settings",
    icon: Mail,
  },
  {
    label: "Audit Logs",
    href: "/super-admin/audit-logs",
    icon: FileTerminal,
  },
  {
    label: "Role Management",
    href: "/super-admin/role-management",
    icon: Shield,
  },
];

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Add the modal state here, in the layout component.
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      {" "}
      {/* Use a Fragment to render modals at the root level */}
      <div className="flex h-screen overflow-hidden ">
        {/* Mobile Sidebar Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden transition-opacity bg-black/50",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* --- Sidebar --- */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg flex flex-col transition-transform transform lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Brand */}
          <div className="px-6 py-4 border-b">
            <h1 className="text-[17px] font-bold">Admin Dashboard</h1>
            <p className="text-[12px] text-[#717182]">B2B SaaS Platform</p>
          </div>

          {/* Scrollable Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) =>
              item.children ? (
                // ... your existing dropdown menu logic (unchanged)
                <div key={item.label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase mt-4 flex items-center gap-1">
                    <span className="w-[14px] h-[14px] flex-shrink-0">
                      <item.icon size={14} className="flex-shrink-0" />
                    </span>{" "}
                    {item.label}
                  </p>
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                          pathname === child.href
                            ? "bg-[#C06EF3] text-white font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <span className="w-[14px] h-[14px] flex-shrink-0">
                          <child.icon size={14} className="flex-shrink-0" />
                        </span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // ... your existing link logic (unchanged)
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                    pathname === item.href
                      ? "bg-[#C06EF3] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="w-[14px] h-[14px] flex-shrink-0">
                    <item.icon size={14} className="flex-shrink-0" />
                  </span>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <div className="flex-1 flex flex-col ml-0 lg:ml-64 overflow-hidden">
          {/* Topbar */}
          <DashboardHeader
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            // 2. Pass the state setter function down to the header.
            onOpenModal={setActiveModal}
          />
          {/* Scrollable Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
      {/* 3. Render modals here, outside the main layout flow. */}
      {/* This ensures they are rendered relative to the viewport, not the header. */}
      {activeModal === "password" && (
        <ChangePasswordModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "email" && (
        <ChangeEmailModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
