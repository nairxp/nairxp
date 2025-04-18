import { NextResponse } from "next/server";
// import { jwtMiddleware } from "./lib/jwtMIddleware";
import { verifyToken } from "./lib/authold";

export default function middleware(request) {
  // const decoded = verifyToken(request);
  // console.log("decoded",decoded)
  const authHeader = request.headers.get("authorization");
  const requestHeaders = new Headers(request.headers);
  // console.log("authheaders",authHeader);
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return new NextResponse(JSON.stringify({ message: "Hello Unauthorized" }), {
  //     status: 401,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  try {
    const decoded = verifyToken(request);
    console.log("decoded",decoded)
    req.user = decoded; // attach user info to request
    // next(); // go to the next middleware or handler
       requestHeaders.set("x-access-token", token); // forward it to downstream routes
  } catch (err) {
    Response.json({ error: "Unauthorized: " + err.message });
  }

  // Optionally extract and forward the token to API routes
  // const token = authHeader.split(" ")[1];
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-access-token", token); // forward it to downstream routes

  // return NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });
}

// Apply middleware only to selected paths
export const config = {
  matcher: ["/api/courses/:path*"],
};

// import nextConnect from 'next-connect';
// import { jwtMiddleware } from './lib/jwtMIddleware';

// const handler = nextConnect();

// handler.use(jwtMiddleware);

// handler.get((req, res) => {
//   res.status(200).json({ message: 'You are authenticated!', user: req.user });
// });

// export default handler;
