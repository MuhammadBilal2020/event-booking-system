import { fetchWithRefresh } from "../utils/serverInterceptor";


export async function getUserFromServer() {
  try {
    const res = await fetchWithRefresh(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
      {},
      "user" // direct user mode
    );

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (err) {
    console.error("getUserFromServer error:", err);
    return null;
  }
}
