"use client";

export async function fetchWithRefreshClient(url, options = {}, mode = "default") {
  let res = await fetch(url, {
    ...options,
    credentials: "include", // browser automatically cookies bhej dega
  });

  if (res.status === 401) {
    console.log("⚠️ Access token expired. Trying refresh on client...");

    // refresh call client karega
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // browser refreshToken cookie bhej dega
    });

    const data = await refreshRes.json();

    if (!refreshRes.ok || !data.accessToken) {
      console.log("❌ Refresh failed on client. User must login again.");
      return res;
    }

    // ✅ new accessToken ke sath retry request
    res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
      credentials: "include",
    });

    // agar mode "user" hai to sidha /me call karke return kar do
    if (mode === "user") {
      const meRes = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
        credentials: "include",
      });
      return meRes;
    }
  }

  return res;
}
