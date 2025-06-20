import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const protectedRoutes = [
  /^\/dashboard$/,
  //   /^\/meetings\/[0-9a-fA-F-]{36}$/,
];

const publicRoutes = ["/signup",'/signin'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((pattern) => pattern.test(path));
  const isPublicRoute = publicRoutes.includes(path);

  const token =  req.cookies.get('session')?.value || ''

  let isAuthenticated = false;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      headers: {
        Authorization:`Bearer ${token}`
      }
    });
    // Assuming a successful response means the user is authenticated and `response.data` contains user info
    isAuthenticated = !!response.data;
  } catch (error) {
    // console.error("Authentication service error:", error);
    // Depending on your error handling strategy, you might want to:
    // 1. Redirect to a login page if it's a 401/403 error.
    // 2. Allow access for public routes even if auth service is down (careful with this).
    // 3. Return an error page or a generic redirect for other errors.
    // For now, we'll assume an error means not authenticated.
    isAuthenticated = false;
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}