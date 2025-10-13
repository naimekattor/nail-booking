export async function POST(request: Request) {
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
  return NextResponse.json({ messageId: data.messageId });
}
