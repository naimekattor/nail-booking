import ProfileHeader from "@/components/business/ProfileHeader";
import ProfileSidebar from "@/components/business/ProfileSidebar";
import { ReactNode } from "react";

// In a real app, you'd fetch this data based on the slug.
// We'll pass it down from here to the header.
async function getBusinessData(slug: string) {
  return { name: "Nail Studio" }; // Mock data
}

export default async function BusinessProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { businessSlug: string };
}) {
  const business = await getBusinessData(params.businessSlug);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col">
        <ProfileHeader businessName={business.name} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
