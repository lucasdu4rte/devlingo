import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const locale = accept.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
