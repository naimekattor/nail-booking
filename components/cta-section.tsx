import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
      <div className="relative container py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-8 text-white">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            Ready to start?
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Join thousands of beauty professionals who trust NailBooking
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-base px-8"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
