// utils/fetchWithRefreshClient.js
export async function fetchWithRefreshClient(url, options = {}, mode = "default") {
  let res = await fetch(url, {
    ...options,
    credentials: "include", // browser automatically cookies bhej dega
  });

  if (res.status === 401) {
    // refresh call
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    const data = await refreshRes.json();
    if (!refreshRes.ok || !data.accessToken) {
      console.log("❌ Refresh failed on client");
      return res;
    }

    res = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
      credentials: "include",
    });
  }

  return res;
}
