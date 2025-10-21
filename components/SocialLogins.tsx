"use client";

import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogins() {
  const { signIn } = useSignIn();

  const socialButtons = [
    { name: "Google", icon: <FcGoogle size={22} />, provider: "google" },
    { name: "Facebook", icon: <FaFacebook size={20} />, provider: "facebook" },
    { name: "Apple", icon: <FaApple size={20} />, provider: "apple" },
  ];

  const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
    if (!signIn) return;
    return signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: "/subscriber",
      redirectUrlComplete: "/subscriber",
    });
  };

  return (
    <div className="w-full">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">OR Sign Up with</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        {socialButtons.map(({ name, icon, provider }) => (
          <Button
            key={name}
            variant="outline"
            onClick={() =>
              handleSocialLogin(provider as "google" | "facebook" | "apple")
            }
            className="h-12 w-full justify-center gap-3 rounded-lg border-gray-300 text-base font-medium text-[#364056] transition-colors hover:bg-gradient-to-r from-pink-500 to-purple-600 hover:text-white cursor-pointer"
          >
            {icon} {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
