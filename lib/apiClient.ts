// lib/apiClient.ts
export interface ApiOptions extends RequestInit {
  auth?: boolean;
  raw?: boolean;
  cookies?: boolean; // optional: server-side token via cookies
}

export async function apiClient<T = any>(
  endpoint: string,
  { auth = false, headers, raw = false, ...options }: ApiOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = baseUrl.endsWith("/") ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;

  let token: string | null = null;

  if (typeof window !== "undefined") {
    // client-side
    token = localStorage.getItem("access_token");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    //   "ngrok-skip-browser-warning": "true",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (raw) return res as unknown as T;

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText || "API error";
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}
