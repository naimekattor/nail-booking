"use client";

import { Service } from "@/types/service";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
  businessSlug: string;
}

export default function ServiceCard({ service, businessSlug }: ServiceCardProps) {
  console.log(service);
  
  return (
    <Link
      href={`/business/${businessSlug}/service/${service.id}`}
      className="block group bg-white shadow-md pb-2 rounded-md overflow-hidden"
    >
      <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
        <img
          src={service?.thumbnail_url || "https://via.placeholder.com/600x450"}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
          ${service.price ?? "-"}
        </div>
      </div>

      <div className="mt-2 px-3 pb-3">
        <h3 className="font-semibold text-gray-800">{service.name}</h3>

        <p className="text-sm text-gray-500">
          {service.duration} mins
        </p>
      </div>
    </Link>
  );
}
