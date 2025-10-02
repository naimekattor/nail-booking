import {
  Clock,
  MessageSquare,
  LayoutDashboard,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow
          </h2>
          <p className="text-xl text-gray-600">
            Simple tools that make a big difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-pink-600" />
              </div>
              <CardTitle className="text-xl">Fast Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create & share your booking page in minutes. No technical skills
                required.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">LINE Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Auto reminders & updates via Official LINE. Keep clients
                informed effortlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">All-in-one</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Calendar, clients, and insights in one app. Everything organized
                beautifully.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
