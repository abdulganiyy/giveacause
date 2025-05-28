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


   const response = await axios.get('http://localhost:3004/auth/profile',{
    headers:{
        Authorization:`Bearer ${token}`
    }
   })

  
    if (isProtectedRoute && !response.data) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  
    if (isPublicRoute && response.data) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  
    return NextResponse.next();
  


}