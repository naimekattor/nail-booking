"use client";

import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Category } from "@/types/service";

export default function BusinessServicesClient({
  categories,
  businessSlug,
}: {
  categories: Category[];
  businessSlug: string;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const displayedCategories = useMemo(() => {
    if (!activeCategoryId || activeCategoryId === "all") return categories;
    return categories.filter((c) => c.id === activeCategoryId);
  }, [activeCategoryId, categories]);

  console.log(categories);
  

  return (
    <div className="w-full">
      {/* Filter buttons */}
      <div
        role="tablist"
        aria-label="Service categories"
        className="bg-white p-2 rounded-lg shadow-sm border flex flex-wrap gap-2"
      >
        {/* All button */}
        <button
          onClick={() => setActiveCategoryId("all")}
          aria-pressed={activeCategoryId === "all"}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 ${
            activeCategoryId === "all"
              ? "bg-pink-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          All
          <span className="ml-2 bg-gray-400 text-white text-xs px-1.5 py-0.5 rounded-full">
            {categories.reduce((sum, c) => sum + (c.services?.length || 0), 0)}
          </span>
        </button>

        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            aria-pressed={activeCategoryId === cat.id}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 ${
              activeCategoryId === cat.id
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat.category}
            <span className="ml-2 bg-gray-400 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cat.services?.length ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Render services (centered, no empty gaps) */}
      <div className="mt-6 space-y-8">
        {displayedCategories.map((category) => (
          <section key={category.id}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {category.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch ">
              {(category.services ?? []).length === 0 ? (
                <p className="text-gray-500">No services in this category.</p>
              ) : (
                category.services!.map((service) => (
                  <div key={service.id} className="w-full ">
                    <ServiceCard
                      service={service}
                      businessSlug={businessSlug}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
