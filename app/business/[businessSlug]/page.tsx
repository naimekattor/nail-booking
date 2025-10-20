import BusinessServicesClient from "@/components/BusinessServicesClient";
import { Category } from "@/types/service";

type Business = {
  id: string;
  username: string;
  name: string;
  categories?: Category[];
};

async function getBusinessData(
  businessSlug: string
): Promise<Business | undefined> {
  const res = await fetch(
    "https://68e76da910e3f82fbf3f179a.mockapi.io/business",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch business data");
  }

  const data: Business[] = await res.json();
  return data.find((biz) => biz.username === "nail-studio");
}

export default async function BusinessHomePage({
  params,
}: {
  params: { businessSlug: string };
}) {
  const { businessSlug } = params;
  const business = await getBusinessData(businessSlug);

  if (!business) {
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

  const categories = business.categories || [];

  return (
    <div className="space-y-8 pb-6 mx-auto max-w-7xl">
      <BusinessServicesClient
        categories={categories}
        businessSlug={businessSlug}
      />
    </div>
  );
}
