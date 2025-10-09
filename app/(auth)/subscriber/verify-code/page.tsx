"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdStar } from "react-icons/io";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return; // allow only 1 character
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input if not the last
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (i < otp.length) newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError(null);

    try {
      const code = otp.join("");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        await router.push("/subscriber");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err?.errors?.[0]?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="md:text-4xl sm:text-3xl font-semibold text-[#1F2023] mb-12 text-center">
        Activation Code
      </h1>

      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold text-[#1F2023]">
          We have sent you an activation code.
        </h2>
        <p className="mt-2 text-sm text-[#636363]">
          An email has been sent to your email address containing a code to
          reset your password.
        </p>
      </div>

      <form
        onSubmit={handleVerify}
        className="mt-8 w-full space-y-4 text-center"
      >
        <label className="text-sm font-medium text-[#1F2023] pb-6">
          Enter verification code
        </label>
        <div className="flex justify-center gap-2 sm:gap-4">
          {otp.map((value, i) => (
            <div className="relative" key={i}>
              <Input
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => {
                  handleChange(e.target.value, i);
                }}
                required
                onPaste={handlePaste}
                className="h-14 w-14 rounded-full border border-gray-300 text-center text-2xl font-bold focus:ring-2 focus:ring-pink-500"
              />
              {value === "" && (
                <IoMdStar className="absolute inset-0 m-auto h-5 w-5 text-[#1F2023] pointer-events-none" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If you didn’t receive a code!{" "}
          <Link
            href="#"
            className="font-semibold text-pink-500 hover:underline"
          >
            click here..
          </Link>
        </p>

        <Button
          type="submit"
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 hover:text-white cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </>
  );
}
