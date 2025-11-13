"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import type { ClerkAPIResponseError } from "@clerk/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialLogins from "@/components/SocialLogins";
import { setAuthFromResponse, signup } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const {addToast}=useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError(null);

    try {
     const res= await signup({ email, password });
     setAuthFromResponse(res);
     addToast("Account created successfully! Please verify your email.");

      router.push("/subscriber/verify-code");
    } catch (err) {
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto">
      <h1 className="md:text-4xl text-center sm:text-3xl font-semibold text-gray-800">
        Create Account
      </h1>
      <p className="mt-2 text-base text-center text-[#636363]">
        Empowering hotels and
      </p>

      <div className="my-10 flex flex-col items-center gap-2">
        <Image src="/images/authIcon.png" alt="icon" width={56} height={56} />
        <h2 className="mt-4 text-xl font-semibold ">Nail Studio</h2>
        <p className="text-sm ">Book your perfect nail service</p>
      </div>

      <form className="mt-8 w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="user@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Confirm Password</label>
          <Input
            type="password"
            name="password"
            
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
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
    </div>
  );
}
