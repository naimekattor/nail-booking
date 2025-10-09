import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsLine } from "react-icons/bs";
import { IoCall } from "react-icons/io5";

// --- Custom SVG Icons for Precise Design ---

const LineIcon = () => (
  <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
    <path d="M21.2,5.2H2.8C2.1,5.2,1.5,5.7,1.5,6.5v11c0,0.7,0.6,1.2,1.2,1.2h18.5c0.7,0,1.2-0.6,1.2-1.2v-11C22.5,5.7,21.9,5.2,21.2,5.2z M8.5,15.2h-2V9.8h2V15.2z M13.8,15.2h-2V9.8h2V15.2z M19.2,15.2h-2V9.8h2V15.2z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.347 1.908 6.161l-1.317 4.814 4.905-1.294z" />
  </svg>
);

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col items-center">
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
          asChild
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105"
        >
          <Link href="/account-info">
            <span className="p-1 bg-green-600 rounded-full">
              <BsLine className="text-white" />
            </span>
            Login with Line
          </Link>
        </Button>

        {/* CORRECTED PATTERN: Button wraps Link */}
        <Button
          asChild
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border-2 border-pink-400 bg-white text-base font-semibold text-pink-500 transition-transform hover:scale-105 hover:bg-pink-50 hover:text-pink-600"
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
          href="/line/sign-up"
          className="font-semibold text-pink-500 hover:underline"
        >
          SignUp
        </Link>
      </p>
    </div>
  );
}
