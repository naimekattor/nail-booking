"use client";
import type { ClerkAPIResponseError } from "@clerk/types";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdStar } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyCode } from "@/lib/auth";

export default function VerifyCodePage() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const email=searchParams.get("email")?? "";
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return; 
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
    setLoading(true);
    setError(null);

    try {
      const code = otp.join("");
      const completeSignUp = await verifyCode({email,otp:code});
      if (completeSignUp.success == true) {
         

         router.push("/subscriber");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      const clerkError = err as ClerkAPIResponseError;

      console.error("Verification error:", err);
      setError(clerkError.errors?.[0]?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("No email address to resend the code.");
      return;
    }

    setResendLoading(true);
    setResendMessage(null);
    setError(null);

    try {
      const res = await fetch(
        `https://poodle-flexible-carefully.ngrok-free.app/accounts/bussiness/${encodeURIComponent(
          email
        )}/request-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? `Server responded ${res.status}`);
      }

      // Success – show friendly message
      setResendMessage("A new code has been sent to your email.");
      // Clear any previous OTP so the user starts fresh
      setOtp(Array(4).fill(""));
      // Auto-focus first box
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      setError(err.message ?? "Failed to resend code. Try again later.");
    } finally {
      setResendLoading(false);
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
        {/* <p className="mt-2 text-sm text-[#636363]">
          An email has been sent to your email address containing a code to
          reset your password.
        </p> */}
      </div>

      <form
        onSubmit={handleVerify}
        className="mt-4 w-full space-y-4 text-center"
      >
        <label className="text-sm font-medium text-[#1F2023] ">
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
          Didn’t receive a code?{" "}
          <button
            type="button"
            disabled={resendLoading || !email}
            onClick={handleResendOtp}
            className="font-semibold text-pink-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? "Sending…" : "Resend"}
          </button>
        </p>
        {resendMessage && (
          <p className="mt-2 text-sm text-green-600">{resendMessage}</p>
        )}

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
