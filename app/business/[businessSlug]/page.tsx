import Link from "next/link";
const filters = ["This Month", "Popular", "Summer", "Wave"];
const ServiceCard = ({
  service,
  businessSlug,
}: {
  service: any;
  businessSlug: string;
}) => (
  <Link
    href={`/business/${businessSlug}/service/${service.id}`}
    className="block group"
  >
    <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
      {/* Replace with <Image /> component */}
      <img
        src={service.image || "https://via.placeholder.com/300"}
        alt={service.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
        ${service.price}
      </div>
    </div>
    <div className="mt-2">
      <h3 className="font-semibold text-gray-800">{service.name}</h3>
      <p className="text-sm text-gray-500">{service.duration}</p>
    </div>
  </Link>
);

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
  params: { businessSlug: string };
}) {
  const business = await getBusinessData(params.businessSlug);
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
    <div className="space-y-8 mx-auto max-w-7xl">
      {/* Filters */}
      <div className="bg-white p-2 rounded-lg shadow-sm border flex flex-wrap gap-2">
        {categories.map((cat: any, index: number) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              index === 0
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.category}{" "}
            {index === 0 && cat.services?.length > 0 && (
              <span className="ml-2 bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cat.services.length}
              </span>
            )}
          </button>
        ))}
        <button className="ml-auto text-sm text-pink-500 font-semibold hover:underline">
          Get Removal
        </button>
      </div>

      {/* Service Categories */}

      <div className="container  mx-auto">
        {categories.map((category: any) => (
          <section key={category.category} className="">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-content-center">
              {category.services?.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  businessSlug={params.businessSlug}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
