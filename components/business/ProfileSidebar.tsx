"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { useMemo } from "react";

const ProfileSidebar = () => {
  const pathname = usePathname();

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
    console.log("Logging out...");
    // router.push('/login')
  };

  return (
    <aside
      className={`
        bg-white border-t border-gray-200
        sm:border-t-0 sm:border-r
        flex
        md:h-full
        sm:flex-col sm:items-center sm:py-8
        justify-around
        sm:justify-between
        w-full sm:w-20 lg:w-24
        fixed bottom-0 sm:relative
        z-30
        md:py-0 py-2
      `}
    >
      {/* Navigation items */}
      <div
        className={`
          flex sm:flex-col
          sm:space-y-8
          space-x-8 sm:space-x-0
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
          sm:mt-auto hidden
        `}
        aria-label="Logout"
      >
        <div className="p-3 rounded-full">
          <FiLogOut size={18} />
        </div>
        <span className="text-xs font-semibold">Logout</span>
      </button>
    </aside>
  );
};

export default ProfileSidebar;
