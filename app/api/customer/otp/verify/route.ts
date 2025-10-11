import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, code } = await req.json();
  // Verify OTP code here (Firebase or Twilio)
  return NextResponse.json({ success: true, token: "fake-jwt-token" });
}
