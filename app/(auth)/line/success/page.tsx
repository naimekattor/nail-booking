import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Custom Success Icon Component
const SuccessIcon = () => (
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
    <svg
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
);

export default function SuccessPage() {
  return (
    // This div creates the floating card effect with shadow and rounded corners
    <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
      <SuccessIcon />
      <p className="mt-6 text-center text-lg font-semibold text-gray-700">
        Account has been created
        <br />
        Successfully
      </p>

      <Button
        asChild
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105"
      >
        <Link href="/line/login" passHref>
          <ArrowLeft className="h-5 w-5" /> Back To login
        </Link>
      </Button>
    </div>
  );
}
