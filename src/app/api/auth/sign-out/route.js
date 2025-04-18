// app/api/logout/route.js

// import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach(cookie => {
    cookieStore.set(cookie.name, '', {
      path: '/',
      maxAge: -1, // Deletes the cookie
    });
  });

  return Response.json({ message: 'Cookies cleared' });
}
