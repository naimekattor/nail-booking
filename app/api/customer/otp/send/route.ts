import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export async function POST(req: Request) {
  const { phone } = await req.json();
  // In production: handle OTP via frontend Recaptcha
  // Here just mock success
  return NextResponse.json({ success: true, message: "OTP sent." });
}
