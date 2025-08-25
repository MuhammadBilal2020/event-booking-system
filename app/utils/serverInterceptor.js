// utils/fetchWithRefresh.js
import { cookies } from "next/headers";

export async function fetchWithRefresh(url, options = {}, mode = "default") {
  try {
    const isServer = typeof window === "undefined";

    let accessToken;
    let refreshToken;

    // =================
    // 1) Server side case → cookies() se tokens nikalo
    // =================
    if (isServer) {
      const cookieStore = await cookies();
      accessToken = cookieStore.get("accessToken")?.value;
      refreshToken = cookieStore.get("refreshToken")?.value;
    }

    // =================
    // 2) Pehla request original API ko
    // =================
    let res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      credentials: "include", // client ke liye cookies auto jayengi
    });

    // =================
    // 3) Agar token expire ho gaya → refresh call
    // =================
    if (res.status === 401) {
      console.log("⚠️ Access token expired. Trying refresh...");

      let refreshRes;
      if (isServer) {
        // server side → manually cookie bhejni hogi
        refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
          {
            method: "POST",
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          }
        );
      } else {
        // client side → browser khud cookie bhej dega
        refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );
      }

      const data = await refreshRes.json();

      if (!refreshRes.ok || !data.accessToken) {
        console.log("❌ Refresh failed. User logout required.");
        return res; // jo bhi 401 tha wo hi return kar do
      }

      // ✅ new accessToken lagao retry request me
      res = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });

      // agar mode "user" hai to sidha /me bhi call karke return kar do
      if (mode === "user") {
        const meRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${data.accessToken}` },
            credentials: "include",
          }
        );
        return meRes;
      }
    }

    return res;
  } catch (err) {
    console.error("❌ fetchWithRefresh error:", err);
    throw err;
  }
}
