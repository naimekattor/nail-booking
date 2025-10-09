// app/[businessSlug]/service/[serviceId]/page.tsx
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { notFound } from "next/navigation";

async function getBusinessData(businessSlug: string) {
  const res = await fetch(
    "https://68e76da910e3f82fbf3f179a.mockapi.io/business",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch business data");
  const data = await res.json();
  return data.find((biz: any) => biz.username === "nail-studio") || null;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ businessSlug: string; serviceId: string }>;
}) {
  // unwrap params (server component)
  const { businessSlug, serviceId } = await params;

  const business = await getBusinessData(businessSlug);
  if (!business) return notFound();

  // flatten categories -> services
  const allServices = (business.categories || []).flatMap(
    (c: any) => c.services || []
  );
  const service = allServices.find(
    (s: any) => String(s.id) === String(serviceId)
  );

  if (!service) return notFound();

  // Pass raw service object to client component
  return (
    <ServiceDetailClient
      service={service}
      businessSlug={businessSlug}
      serviceId={serviceId}
    />
  );
}
