import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = request.headers.get("authorization")?.replace("Bearer ", "");

  const response = await fetch("https://api.brevo.com/v3/smtp/templates", {
    headers: {
      "api-key": apiKey!,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json({ templates: data.templates });
}
