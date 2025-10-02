import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 place-items-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-[46px] font-semibold leading-tight text-balance">
            Book smarter.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9810FA] via-[#F6339A] to-[#9810FA]">
              Run your salon easier.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-xl">
            A simple booking system for independent beauty professionals.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-tr from-[#F6339A] to-[#9810FA] hover:bg-[#F6339A] hover:text-white text-base px-8 cursor-pointer"
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

        <div className="">
          <div className="h-full">
            <Image
              src="/images/hero.png"
              alt="NailBooking App Interface"
              width={511}
              height={287}
              className=""
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
