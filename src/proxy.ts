import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get("devlingo_locale")?.value;
  if (cookieLocale === "en" || cookieLocale === "pt-BR") {
    return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
  }
  const accept = request.headers.get("accept-language") ?? "";
  const locale = accept.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
