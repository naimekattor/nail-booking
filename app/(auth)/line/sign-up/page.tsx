"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsLine } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { signIn } from "next-auth/react";

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center h-full flex-1  min-w-md mx-auto">
        <h1 className="md:text-4xl sm:text-3xl font-semibold text-gray-800">
          Create Account
        </h1>
        <p className="mt-2 text-base text-[#636363]">Empowering hotels and</p>

        <div className="my-10 flex flex-col items-center gap-2">
          <Image src="/images/authIcon.png" alt="icon" width={56} height={56} />
          <h2 className="mt-4 text-xl font-semibold ">Nail Studio</h2>
          <p className="text-sm ">Book your perfect nail service</p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {/* CORRECTED PATTERN: Button wraps Link */}
          <Button
            onClick={() =>
              signIn("line", {
                callbackUrl: `${window.location.origin}/business/business/profile`,
              })
            }
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
          >
            <span className="p-1 bg-green-600 rounded-full">
              <BsLine className="text-white" />
            </span>
            Login with Line
          </Button>

          {/* CORRECTED PATTERN: Button wraps Link */}
          <Button
            asChild
            variant="outline"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border-2 border-pink-400 bg-white text-base font-semibold text-pink-500 transition-transform hover:scale-105 hover:bg-pink-50 hover:text-pink-600 cursor-pointer"
          >
            <Link href="/account-info">
              <span className="p-1 bg-green-600 rounded-full">
                <IoCall className="text-white" />
              </span>
              Login with Number
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Dont have an account?{" "}
          <Link
            href="/line/login"
            className="font-semibold text-pink-500 hover:underline"
          >
            login
          </Link>
        </p>
      </div>
      <div className="mt-4 text-sm text-[#4A5565] bg-[#FDFAFF] p-2 max-w-4xl mx-auto mb-8 rounded-md ">
        Share your email so we can send you important updates and messages. Your
        privacy is our priority, and your information will only be used for this
        purpose.
      </div>
    </div>
  );
}
