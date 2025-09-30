import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Amy Chen",
    role: "Nail Artist",
    avatar: "/asian-woman-professional-headshot.png",
    content:
      "NailBooking transformed how I manage appointments. My clients love the easy booking and LINE reminders!",
  },
  {
    name: "Jessica Wu",
    role: "Beauty Salon Owner",
    avatar: "/asian-woman-business-owner-headshot.png",
    content:
      "Finally, a booking system that just works. Setup took 5 minutes and my bookings increased by 40%.",
  },
  {
    name: "Michelle Lin",
    role: "Lash Extension Specialist",
    avatar: "/asian-woman-beauty-specialist-headshot.jpg",
    content:
      "The affiliate program is amazing! I'm earning extra income just by recommending to fellow beauty pros.",
  },
];

export function Testimonials() {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Loved by beauty pros
        </h2>
        <p className="text-lg text-muted-foreground">
          Join thousands of satisfied salon owners
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="bg-card rounded-xl p-8 border shadow-sm space-y-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-muted-foreground text-pretty">
              {testimonial.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
