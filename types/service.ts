// types/service.ts

export type Requirement = string;

export interface AvailableAddOn {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface ChosenAddOn extends AvailableAddOn {
  quantity: number;
  customPrice: number;
}

export interface ServiceDetails {
  images: string[];
}
export interface NestedService {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  requirements?: string[];
}
export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  requirements?: string[];
  addOns?: AvailableAddOn[];
  image?: string;
  images?: string[];
  serviceDetails: ServiceDetails;
  service: NestedService;
}

export interface ServiceDetailClientProps {
  service: Service;
  businessSlug: string;
  serviceId: string;
}

export interface Category {
  id: string;
  name: string;
  services?: Service[];
  category: string;
}

export interface Business {
  id: string;
  username: string;
  name: string;
  categories?: Category[];
}
