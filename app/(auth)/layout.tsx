import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-t from-purple-100 to-white">
        <Image
          width={1645}
          height={1334}
          src="/images/auth.png"
          alt="Nail Studio"
          className="max-w-md"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
