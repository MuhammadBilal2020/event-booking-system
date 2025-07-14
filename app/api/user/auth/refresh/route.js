import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    console.log();
    
    const refreshToken = cookie
      .split(";")
      .find((c) => c.trim().startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return new Response(JSON.stringify({ message: "No refresh token" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return new Response(
      JSON.stringify({ message: "Token refreshed" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict; Secure`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid refresh token" }), {
      status: 401,
    });
  }
}
