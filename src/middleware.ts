import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export default async function middleware(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;

  console.log(token,"미들웨어 토큰");
  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}