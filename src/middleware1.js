import { NextResponse } from "next/server";

export function middleware(request) {
  const authHeader = request.headers.get("authorization");
  console.log(request.headers.get("referer"));
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Optionally extract and forward the token to API routes
  const token = authHeader.split(" ")[1];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-access-token", token); // forward it to downstream routes

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Apply middleware only to selected paths
export const config = {
  matcher: ["/courses/:path*"],
};
