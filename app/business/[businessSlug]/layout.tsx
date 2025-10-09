import ProfileHeader from "@/components/business/ProfileHeader";
import ProfileSidebar from "@/components/business/ProfileSidebar";
import { ReactNode } from "react";

interface BusinessProfileLayoutProps {
  children: ReactNode;
  params: { businessSlug: string };
}

// Mock fetch function (can be replaced with API)
async function getBusinessData(slug: string) {
  try {
    return { name: "Nail Studio" };
  } catch (error) {
    console.error("Failed to fetch business data:", error);
    return { name: "Fallback Business" };
  }
}

export default async function BusinessProfileLayout({
  children,
  params,
}: BusinessProfileLayoutProps) {
  const business = await getBusinessData(params.businessSlug);

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-20 bg-white shadow-sm"
        role="banner"
        aria-label="Business Profile Header"
      >
        <ProfileHeader businessName={business.name} />
      </header>

      <div className="flex  bg-gray-100 font-sans overflow-hidden">
        {/* Sidebar */}
        {/* <aside
          className={`
            fixed
            bottom-0 left-0 right-0
            lg:top-[4rem]  
            h-screen     
            lg:bottom-0
            lg:max-w-24
            lg:flex-shrink-0
            bg-white shadow-sm z-30
            flex flex-row lg:flex-col
            justify-between lg:justify-start
            transition-all duration-300
          `}
          role="navigation"
          aria-label="Business Profile Sidebar"
        >
          <ProfileSidebar />
        </aside> */}
        <aside className="">
          <ProfileSidebar />
        </aside>

        {/* Main Content */}
        <main
          className={`
            flex-1 overflow-y-auto
            p-4 sm:p-6
            mb-16 lg:mb-0
            
            transition-all duration-300
          `}
          role="main"
          aria-label="Business Profile Content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
