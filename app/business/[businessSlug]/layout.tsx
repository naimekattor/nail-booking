import ProfileHeader from "@/components/business/ProfileHeader";
import ProfileSidebar from "@/components/business/ProfileSidebar";
import BusinessProfileContent from "@/components/BusinessProfileContent";
import { ReactNode } from "react";

interface BusinessProfileLayoutProps {
  children: ReactNode;
  params: Promise<{ businessSlug: string }>;
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
  const { businessSlug } = await params;
  const business = await getBusinessData(businessSlug);

  return (
    <BusinessProfileContent>
      <div className="h-screen flex flex-col  font-sans">
        {/* Sticky Header */}
        <header
          className="sticky top-0 z-20 bg-white shadow-sm"
          role="banner"
          aria-label="Business Profile Header"
        >
          <ProfileHeader businessName={business.name} />
        </header>

        <div className="flex flex-1   font-sans overflow-hidden">
          <aside className="border-r-2">
            <ProfileSidebar />
          </aside>

          {/* Main Content */}
          <main
            className={`
            flex-1 overflow-y-auto
            p-4 sm:p-6
            mb-16 lg:mb-0 pb-16
            
            transition-all duration-300 h-full
          `}
            role="main"
            aria-label="Business Profile Content"
          >
            {children}
          </main>
        </div>
      </div>
    </BusinessProfileContent>
  );
}
