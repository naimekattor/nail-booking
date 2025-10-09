import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="md:text-4xl sm:text-3xl font-semibold text-gray-800">
        Create Account
      </h1>
      <p className="mt-2 text-base text-[#636363]">Empowering hotels and</p>
      <form className="mt-8 w-full space-y-4">
        <div>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 pr-4 py-2"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="password">Confirm Password</label>
          <div className="relative">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 pr-4 py-2"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-pink-50 hover:text-pink-600"
        >
          <Link href="/account-info">Confirm</Link>
        </Button>
      </form>
    </>
  );
}
