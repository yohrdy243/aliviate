import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const userCookie = req.cookies.get("jwt");

	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/app", req.url));
	}
	if (userCookie === undefined) {
		return Response.redirect(new URL("/login", req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/app/:path*", "/"],
};
