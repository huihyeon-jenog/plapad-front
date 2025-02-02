import {NextRequest, NextResponse} from "next/server";
import {getToken} from "@/app/lib/session";

export default async function middleware(req: NextRequest) {
  const token = await getToken();

  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}