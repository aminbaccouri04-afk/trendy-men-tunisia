import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", request.url)); // Forbidden for regular users
        }
    }

    return NextResponse.next();
}

export const config = { matcher: ["/admin/((?!login).*)"] }
