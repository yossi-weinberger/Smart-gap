import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const loginUrl = new URL("/auth/login", req.url);

  // Ignore requests to static files, API routes, and auth-related routes
  const path = req.nextUrl.pathname;
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/static/") ||
    path.startsWith("/public/") ||
    path.startsWith("/api/auth/") || // Usually NextAuth.js uses this path
    path === "/auth/login" ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // If user is not authenticated and the path is not the home page ("/")
  if (!isAuth && path !== "/") {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!auth/login).*)"], // Match all paths except /auth/login
};

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req });
//   const isAuth = !!token;
//   const loginUrl = new URL("/auth/login", req.url);

//   if (req.nextUrl.pathname.startsWith("/contact") && !isAuth) {
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/contact"],
// };
