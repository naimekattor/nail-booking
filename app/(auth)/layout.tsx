export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-t from-purple-100 to-white">
        <img src="/images/auth.png" alt="Nail Studio" className="max-w-md" />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
