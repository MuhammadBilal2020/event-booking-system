import { cookies } from "next/headers";

export async function fetchWithRefresh(url, options = {}, mode = "default") {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    // =================
    // 1) Pehla request original API ko
    // =================
    let res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      // credentials ki zarurat nahi, kyunki server pe cookies() se le li
    });

    // =================
    // 2) Agar token invalid/expired hai
    // =================
    if (res.status === 401) {
      console.log("❌ Access token invalid on server. Redirect needed.");
      // server pe refresh karne ka koi faida nahi, cookie browser me set nahi hogi
      return res;
    }

    // agar mode "user" hai to sidha /me call karke return kar do
    if (mode === "user") {
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });
      return meRes;
    }

    return res;
  } catch (err) {
    console.error("❌ fetchWithRefresh (server) error:", err);
    throw err;
  }
}
