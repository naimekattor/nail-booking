import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Book smarter.{" "}
            <span className="text-primary">Run your salon easier.</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-xl">
            A simple booking system for independent beauty professionals.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-base px-8"
          >
            Start Free Trial
          </Button>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by salons in Taiwan
            </p>
            <div className="flex flex-wrap gap-3">
              {["Salon A", "Studio B", "Beauty C", "Nails D", "Spa E"].map(
                (salon) => (
                  <div
                    key={salon}
                    className="px-4 py-2 bg-muted rounded-lg text-sm font-medium"
                  >
                    {salon}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square max-w-lg mx-auto">
            <Image
              src="/beauty-salon-booking-app-interface-with-phone-mock.jpg"
              alt="NailBooking App Interface"
              width={600}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
