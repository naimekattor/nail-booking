import BusinessServicesClient from "@/components/BusinessServicesClient";
import { Business, Category } from "@/types/service";

function mapCategoriesObj(categoriesObj: Record<string, any[]>) {
  console.log("Raw categories object:", categoriesObj);

  const mapped = Object.entries(categoriesObj).map(([key, services]) => {
    console.log(`Mapping category: ${key}`, services);

    return {
      id: key,
      category: key,
      services,
    };
  });

  console.log("Mapped categories array:", mapped);
  return mapped;
}




async function getBusinessData(businessSlug: string) {
  const res = await fetch(
    `https://poodle-flexible-carefully.ngrok-free.app/customer_management/${businessSlug}/list-services/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch business data");
  }

  const data = await res.json();
  console.log("Fetched data:", data);

  return mapCategoriesObj(data);
}


export default async function BusinessHomePage({
  params: { businessSlug },
}: {
  params: { businessSlug: string };
}) {
  const business = await getBusinessData(businessSlug);

  if (!business || business.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-gray-200">
          Business not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The page you&apos;re looking for doesn&apos;t exist
        </p>
      </div>
    );
  }

  // FIX: business is already an array of categories
  const categories = business;

  return (
    <div className="space-y-8 pb-6 mx-auto max-w-7xl">
      <BusinessServicesClient
        categories={categories}
        businessSlug={businessSlug}
      />
    </div>
  );
}
