"use client";

import { Button } from "@/components/ui/button";
import { authLogin } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaApple, FaFacebook, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogins() {
  const pathName = usePathname();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const socialButtons = [
    { name: "Google", icon: <FcGoogle size={22} />, provider: "google" },
    { name: "Facebook", icon: <FaFacebook size={20} />, provider: "facebook" },
    { name: "Apple", icon: <FaApple size={20} />, provider: "apple" },
  ];

  const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    setLoadingProvider(provider);

    try {
      const res = await authLogin({
        method: provider,
        // Dynamic URLs – work everywhere
        success_url: `${window.location.origin}/subscriber/`,
        cancel_url:  `${window.location.origin}/subscriber/login`,
      });

      if (!res?.link) {
        throw new Error("No redirect URL returned from server");
      }

      // External OAuth → full page navigation
      window.location.href = res.link;
      
    } catch (err: any) {
      console.error(`[${provider}] login error:`, err);
      // Optional: toast / alert
      alert(err.message ?? "Login failed – please try again.");
    } finally {
      setLoadingProvider(null);
    }
  };
  return (
    <div className="w-full">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">
            {pathName === "/subscriber/login"
              ? "OR Login  with"
              : "OR Sign Up with"}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        {socialButtons.map(({ name, icon, provider }) => {
          const isLoading = loadingProvider === provider;

          return (
            <Button
              key={name}
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSocialLogin(provider as any)}
              className={`
                h-12 w-full justify-center gap-3 rounded-lg border-gray-300
                text-base font-medium text-[#364056]
                transition-colors hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600
                hover:text-white cursor-pointer
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                icon
              )}{" "}
              {isLoading ? `Connecting…` : name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
