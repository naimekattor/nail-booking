// app/[businessSlug]/service/[serviceId]/page.tsx
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { Service, NestedService, ServiceDetails } from "@/types/service";
import { notFound } from "next/navigation";

type Category = {
  id: string;
  name: string;
  services?: Service[];
};

type Business = {
  id: string;
  username: string;
  name: string;
  categories?: Category[];
};
async function getBusinessData(businessSlug: string): Promise<Business | null> {
  const res = await fetch(
    "https://68e76da910e3f82fbf3f179a.mockapi.io/business",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch business data");
  const data: Business[] = await res.json();

  return data.find((biz) => biz.username === "nail-studio") || null;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceId: string }>;
}) {
  const { businessSlug, serviceId } = await params;

  const business = await getBusinessData(businessSlug);
  if (!business) return notFound();

  const allServices: Service[] = (business.categories || []).flatMap(
    (c) => c.services || []
  );
  const service: Service | undefined = allServices
  .map((s: Service) => ({
    ...s,
    serviceDetails: s.serviceDetails || { images: s.images ?? [] },
    service: s.service || {
      id: "",
      name: "",
      duration: 0,
      price: 0,
      // Add other required NestedService fields with safe defaults
    } as NestedService,
  }))
  .find((s) => s.id === serviceId);

  if (!service) return notFound();

  return (
    <ServiceDetailClient
      service={service}
      businessSlug={businessSlug}
      serviceId={serviceId}
    />
  );
}
