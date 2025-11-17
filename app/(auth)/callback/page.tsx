"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    console.log("🔎 FRONTEND CALLBACK PARAMS:");
    console.log("state =", state);
    console.log("code  =", code);
    console.log("error =", error);

    async function sendToBackend() {
      try {
        if (error) {
          console.error("❌ OAuth provider returned error:", error);
          router.replace("/login?error=oauth_error");
          return;
        }

        if (!code || !state) {
          console.error("❌ Missing code or state");
          router.replace("/login?error=missing_code_state");
          return;
        }

        console.log("📡 SENDING TO BACKEND:", {
          code,
          state,
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2_connect/callback?state=${state}&code=${code}`,
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2_connect/callback/?state=${state}&code=${code}`,{
            headers:{
                "ngrok-skip-browser-warning":"true"
            }
          }
          
        );

        console.log("📩 BACKEND RAW RESPONSE:", response);

        if (!response.ok) {
          console.error("❌ Backend returned error:", response.status);
          const text = await response.text();
          console.log("📄 Raw backend response text:", text);
        //   router.replace("/subscriber/login?error=backend_failed");
          return;
        }

        const data = await response.json();

        console.log("✅ BACKEND JSON RESPONSE:", data);

        // If backend returns tokens in body
        if (data.access_token) {
          console.log("🔐 Saving access token");
          localStorage.setItem("access_token", data.access_token);
        }

        if (data.refresh_token) {
          console.log("🔄 Saving refresh token");
          localStorage.setItem("refresh_token", data.refresh_token);
        }

        console.log("🎉 Redirecting to /subscriber ...");
        router.replace("/subscriber");

      } catch (err) {
        console.error("🔥 ERROR in callback handler:", err);
        // router.replace("/subscriber/login?error=internal_error");
      } finally {
        setLoading(false);
      }
    }

    sendToBackend();
  }, [params, router]);

  return (
    <div className="flex h-screen items-center justify-center text-gray-600">
      {loading ? "Processing login..." : "Redirecting..."}
    </div>
  );
}
