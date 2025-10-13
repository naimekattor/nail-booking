import BusinessServicesClient from "@/components/BusinessServicesClient";
import Link from "next/link";

// const ServiceCard = ({
//   service,
//   businessSlug,
// }: {
//   service: any;
//   businessSlug: string;
// }) => (
//   <Link
//     href={`/business/${businessSlug}/service/${service.id}`}
//     className="block group bg-white shadow-md pb-2 rounded-md"
//   >
//     <div className="relative rounded-lg overflow-hidden aspect-[4/3] ">
//       <img
//         src={service.image || "https://via.placeholder.com/300"}
//         alt={service.name}
//         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//       />
//       <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
//         ${service.price}
//       </div>
//     </div>
//     <div className="mt-2 px-2">
//       <h3 className="font-semibold text-gray-800">{service.name}</h3>
//       <p className="text-sm text-gray-500">{service.duration}</p>
//     </div>
//   </Link>
// );

async function getBusinessData(businessSlug: string) {
  const res = await fetch(
    "https://68e76da910e3f82fbf3f179a.mockapi.io/business",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch business data");
  }
  const data = await res.json();
  console.log(data.find((biz: any) => biz.username === "nail-studio"));

  return data.find((biz: any) => biz.username === "nail-studio");
}
export default async function BusinessHomePage({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessData(businessSlug);
  if (!business) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-gray-200">
          Business not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist
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
