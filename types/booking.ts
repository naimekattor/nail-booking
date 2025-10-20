export interface Booking {
  id: string;
  service: string;
  date: string | null;
  technician: string;
  duration: number;
  notes: string | null;
  addOns: string[];
  requirements: string[];
  price: number;
  status: string;
  image?: string;
}

export interface BookingWithParsedDate extends Booking {
  parsedDate: Date | null;
}
