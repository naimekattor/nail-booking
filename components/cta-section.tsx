"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function CTASection() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"signup" | "login">("signup");
  const handleGetStarted = () => {
    setAuthTab("signup");
    setShowAuthModal(true);
  };
  const handleLoginClick = () => {
    setAuthTab("login");
    setShowAuthModal(true);
  };
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to start?
        </h2>
        <p className="text-xl text-pink-100 mb-8">
          Join thousands of beauty professionals who trust NailBooking
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}
