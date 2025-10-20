import { Star } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Loved by beauty pros
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied salon owners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Amy Chen",
              role: "Nail Artist",
              avatar:
                "https://i.ibb.co.com/WvbmX5Dh/picture-elegant-young-fashion-man-158595-531.jpg",
              rating: 5,
              review:
                "NailBooking transformed how I manage appointments. My clients love the easy booking and LINE reminders!",
            },
            {
              name: "Jessica Wu",
              role: "Beauty Salon Owner",
              avatar:
                "https://i.ibb.co.com/WvbmX5Dh/picture-elegant-young-fashion-man-158595-531.jpg",
              rating: 5,
              review:
                "Finally, a booking system that just works. Setup took 5 minutes and my bookings increased by 40%.",
            },
            {
              name: "Michelle Lin",
              role: "Lash Extension Specialist",
              avatar:
                "https://i.ibb.co.com/WvbmX5Dh/picture-elegant-young-fashion-man-158595-531.jpg",
              rating: 5,
              review:
                "The affiliate program is amazing! I'm earning extra income just by recommending to fellow beauty pros.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full w-12 h-12 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
