import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();
  // In production: handle OTP via frontend Recaptcha
  // Here just mock success
  return NextResponse.json({ success: true, message: "OTP sent." });
}
