import { NextResponse } from "next/server";
import React from "react";
import { cookies } from "next/headers";
export default async function middleware(request) {
  const cookieStore = await cookies();
  const email = cookieStore.get("email");

  const role = cookieStore.get("role")?.value;
  const url = request.nextUrl;
  if (url.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!email)
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  else return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:path*", "/admin/:path*"],
  // matcher: ['/auth/login/:path*', '/profile/:path*'],
};
