"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";
import { useMemo } from "react";

const ProfileSidebar = () => {
  const pathname = usePathname();

  // This is the key to making the links dynamic and correct.
  // We extract the base business slug from the current URL.
  // Example: if pathname is "/johns-salon/profile", slug will be "johns-salon".
  const businessSlug = useMemo(() => pathname.split("/")[1] || "", [pathname]);

  // Define navigation items with correctly constructed hrefs
  const navItems = [
    { href: `/${businessSlug}`, icon: FiHome, label: "Home" },
    { href: `/${businessSlug}/profile`, icon: FiUser, label: "Profile" },
  ];

  // In a real application, logout should be a function call, not a navigation event.
  const handleLogout = () => {
    // Here you would typically call an API endpoint to sign the user out,
    // clear session/token, and then redirect.
    console.log("Logging out...");
    // router.push('/login');
  };

  return (
    <aside className="hidden sm:flex w-20 lg:w-24 bg-white flex-col items-center py-8 space-y-8 border-r border-gray-200">
      <div className="space-y-8">
        {navItems.map((item) => {
          // Determine if the current link is active.
          // For the "Home" link, we check for an exact match.
          // For other links, we can check if the path starts with the href for nested routes.
          const isActive =
            item.href === `/${businessSlug}`
              ? pathname === item.href
              : pathname.startsWith(item.href);

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
                <item.icon size={24} />
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 transition-colors text-gray-500 hover:text-pink-500 mt-auto"
        aria-label="Logout"
      >
        <div className="p-3 rounded-full">
          <FiLogOut size={24} />
        </div>
        <span className="text-xs font-semibold">Logout</span>
      </button>
    </aside>
  );
};

export default ProfileSidebar;
