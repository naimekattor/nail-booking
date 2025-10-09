"use client";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCall } from "react-icons/io5";
import SocialLogins from "@/components/SocialLogins";
import { useSignUp } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setLoading(true);
    setError(null);
    try {
      await signUp.create({
        emailAddress,
        password,
        publicMetadata: { role: "subscriber" },
      });

      //send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      await router.push("/subscriber/verify-code");
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err?.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="md:text-4xl sm:text-3xl font-semibold text-gray-800">
        Create Account
      </h1>
      <p className="mt-2 text-base text-[#636363]">Empowering hotels and</p>

      <div className="my-10 flex flex-col items-center gap-2">
        <Image src="/images/authIcon.png" alt="icon" width={56} height={56} />
        <h2 className="mt-4 text-xl font-semibold ">Nail Studio</h2>
        <p className="text-sm ">Book your perfect nail service</p>
      </div>
      <form className="mt-8 w-full space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={emailAddress}
          placeholder="user@mail.com"
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="password" placeholder="Password" />
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-pink-50 hover:text-white cursor-pointer"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-pink-500 ring-offset-2 ring-pink-500 focus:outline-none focus:ring-2"
        >
          Sign In
        </Link>
      </p>
      <SocialLogins />
      <div id="clerk-captcha" style={{ display: "none" }}></div>
    </>
  );
}
