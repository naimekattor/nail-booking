"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function AccountInfoPage() {
  const [selected, setSelected] = useState("Choose One");

  const handleSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="md:text-4xl sm:text-3xl font-semibold text-gray-800">
        Create Account
      </h1>
      <p className="mt-2 text-base text-[#636363]">Empowering hotels and</p>

      <div className="mt-10 w-full space-y-2 text-left">
        <label className="text-sm font-medium text-gray-700">
          What Describes you best.
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 text-left text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <span>{selected}</span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={4}
            className="min-w-[100%] p-1"
          >
            {["Business Owner", "Customer"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => handleSelect(item)}
                className="cursor-pointer"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-xs text-gray-400">Unchangeable one time process</p>
      </div>

      <Button
        asChild
        className="mt-8 h-12 w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition-transform hover:scale-105"
      >
        <Link href="/line/success">Continue</Link>
      </Button>
    </div>
  );
}
