import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("authorization")?.replace("Bearer ", "");
    const body = await request.json();

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId: parseInt(body.templateId),
        to: body.to,
        params: body.params,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email" },
        { status: response.status }
      );
    }

    return NextResponse.json({ messageId: data.messageId });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
