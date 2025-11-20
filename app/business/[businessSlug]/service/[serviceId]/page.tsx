import ServiceDetailClient from "@/components/ServiceDetailClient";
import { Service, NestedService, ServiceDetails } from "@/types/service";
import { notFound } from "next/navigation";

type CategoryArray = {
  id: string;
  name: string;
  services: Service[];
};

type BusinessData = {
  all: Service[];
  [category: string]: any;
};
async function getBusinessData(businessSlug: string): Promise<BusinessData> {
  const res = await fetch(
    `https://poodle-flexible-carefully.ngrok-free.app/customer_management/${businessSlug}/list-services/`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch business data");
  return res.json();
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { businessSlug: string; serviceId: string };
}) {
  const { businessSlug, serviceId } = params;

  const data = await getBusinessData(businessSlug);
  if (!data || !data.all) return notFound();

   const service = data.all
    .map((s: Service) => ({
      ...s,
      serviceDetails: s.serviceDetails || { images: s.images ?? [] },
      service:
        s.service ||
        ({
          id: "",
          name: "",
          duration: 0,
          price: 0,
        } as NestedService),
    }))
    .find((s) => s.id.toString() === serviceId);

  if (!service) return notFound();
  console.log(service);
  

  return (
    <ServiceDetailClient
      service={service}
      businessSlug={businessSlug}
      serviceId={serviceId}
    />
  );
}
