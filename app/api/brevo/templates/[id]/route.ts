import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const apiKey = request.headers.get("authorization")?.replace("Bearer ", "");
  const { id } = params;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const response = await fetch(
    `https://api.brevo.com/v3/smtp/templates/${id}`,
    {
      headers: {
        "api-key": apiKey,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `Failed to fetch preview: ${errorText}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
