"use client";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialLogins from "@/components/SocialLogins";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            router.push("/subscriber");
          },
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <h1 className="md:text-4xl sm:text-3xl font-semibold text-gray-800 text-center">
        Login Account
      </h1>
      {/* <p className="mt-2 text-base text-[#636363]">Empowering hotels and</p> */}
      <form onSubmit={(e) => handleSubmit(e)} className="mt-8 w-full space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <div className="relative">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="user@mail.com"
              className="pl-10 pr-4 py-2"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="password">Passowrd</label>
            <div className="relative">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="pl-10 pr-4 py-2"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="mt-2 text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-pink-500 hover:underline"
            >
              Forget password?
            </Link>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-pink-50 hover:text-white cursor-pointer"
        >
          Login
        </Button>
      </form>
      <p className="mt-6 text-sm text-gray-500 text-center">
        Need an account?{" "}
        <Link
          href="/subscriber/signup"
          className="font-semibold text-pink-500 ring-offset-2 ring-pink-500 focus:outline-none focus:ring-2"
        >
          Sign Up
        </Link>
      </p>
      <SocialLogins />
    </>
  );
}
