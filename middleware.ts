import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl?.pathname || "/";

  // 1️⃣ Protect subscriber routes (Clerk)
  if (pathname.startsWith("/dashboard")) {
    // Clerk already handles auth
    return NextResponse.next();
  }

  // 2️⃣ Protect customer routes (NextAuth)
  if (pathname.startsWith("/customer") || pathname.startsWith("/bookings")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL("/customer/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
