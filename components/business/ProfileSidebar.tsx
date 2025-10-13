"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // ✅ Extract the business slug dynamically
  const businessSlug = useMemo(() => pathname.split("/")[1] || "", [pathname]);

  // ✅ Define navigation items
  const navItems = [
    { href: `/business/${businessSlug}/`, icon: FiHome, label: "Home" },
    {
      href: `/business/${businessSlug}/profile`,
      icon: FiUser,
      label: "Profile",
    },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/business/business" });
  };

  return (
    <aside
      className={`
        bg-white border-t border-gray-200
    sm:border-t-0 
    fixed bottom-0 sm:relative
    flex md:flex-col md:items-center w-full sm:w-20 lg:w-24
    h-16 sm:h-auto
    justify-between sm:justify-between
    items-center sm:items-start
    px-4 sm:px-0
    z-30
      `}
    >
      {/* Navigation items */}
      <div
        className={`
          flex w-full sm:flex-col
      justify-between sm:justify-start
      items-center sm:items-center
      h-full
      space-x-4 sm:space-x-0 sm:space-y-6
        `}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === `/${businessSlug}`
              ? pathname === item.href
              : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={`p-3 rounded-full transition-colors ${
                  isActive ? "bg-pink-100" : ""
                }`}
              >
                <item.icon size={18} />
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className={`
          flex flex-col items-center gap-1 transition-colors
          text-gray-500 hover:text-pink-500
          sm:mt-auto md:hidden
        `}
          aria-label="Logout"
        >
          <div className="p-3 rounded-full">
            <FiLogOut size={18} />
          </div>
          <span className="text-xs font-semibold">Logout</span>
        </button>
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className={`
          md:flex flex-col items-center gap-1 transition-colors
          text-gray-500 hover:text-pink-500
          sm:mt-auto hidden cursor-pointer
        `}
        aria-label="Logout"
      >
        <div className=" rounded-full">
          {session?.user ? <FiLogOut size={16} /> : ""}
        </div>
        <span className="text-xs font-semibold">
          {session?.user ? "Logout" : ""}
        </span>
      </button>
    </aside>
  );
};

export default ProfileSidebar;
