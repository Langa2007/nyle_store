export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("adminAccessToken");
  const refreshToken = localStorage.getItem("adminRefreshToken");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // If access token expired
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("adminAccessToken", data.accessToken);

      // Retry the original request with new token
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
    } else {
      // Refresh token also expired → force logout
      localStorage.removeItem("adminAccessToken");
      localStorage.removeItem("adminRefreshToken");
      window.location.href = "/login";
    }
  }

  return res;
}
