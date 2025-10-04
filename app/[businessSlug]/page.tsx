import Link from "next/link";
import { FiCheck } from "react-icons/fi";

// MOCK DATA: In a real app, this comes from your database.
const serviceCategories = [
  {
    name: "This Month",
    services: [
      {
        id: "1",
        name: "Classic French",
        duration: "75min",
        image: "/path/to/image1.jpg",
        price: 77,
      },
      {
        id: "2",
        name: "Marble Effect",
        duration: "110min",
        image: "/path/to/image2.jpg",
        price: 90,
      },
      {
        id: "3",
        name: "Rose Gold Glam",
        duration: "85min",
        image: "/path/to/image3.jpg",
        price: 42,
      },
      {
        id: "4",
        name: "Ocean Wave",
        duration: "120min",
        image: "/path/to/image4.jpg",
        price: 50,
      },
    ],
  },
  {
    name: "Popular",
    services: [
      {
        id: "5",
        name: "Pearl Wave",
        duration: "110min",
        image: "/path/to/image5.jpg",
        price: 90,
      },
      {
        id: "6",
        name: "Crystal Clear",
        duration: "115min",
        image: "/path/to/image6.jpg",
        price: 82,
      },
      {
        id: "7",
        name: "Marble Effect",
        duration: "110min",
        image: "/path/to/image7.jpg",
        price: 72,
      },
      {
        id: "8",
        name: "Ocean Wave",
        duration: "120min",
        image: "/path/to/image8.jpg",
        price: 52,
      },
    ],
  },
  // ... other categories
];

const filters = ["This Month", "Popular", "Summer", "Wave"];

const ServiceCard = ({
  service,
  businessSlug,
}: {
  service: any;
  businessSlug: string;
}) => (
  <Link href={`/${businessSlug}/service/${service.id}`} className="block group">
    <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
      {/* Replace with <Image /> component */}
      <img
        src="https://via.placeholder.com/300"
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

export default async function BusinessHomePage({
  params,
}: {
  params: { businessSlug: string };
}) {
  // const categories = await getServicesForBusiness(params.businessSlug);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white p-2 rounded-lg shadow-sm border flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              index === 0
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}{" "}
            {index === 0 && (
              <span className="ml-2 bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full">
                4
              </span>
            )}
          </button>
        ))}
        <button className="ml-auto text-sm text-pink-500 font-semibold hover:underline">
          Get Removal
        </button>
      </div>

      {/* Service Categories */}
      {serviceCategories.map((category) => (
        <section key={category.name}>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.services.map((service) => (
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
  );
}
