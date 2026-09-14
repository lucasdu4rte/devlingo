import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";
import { proxy } from "./proxy";

function redirectFor(headers: Record<string, string>) {
  return proxy(new NextRequest("http://localhost/", { headers })).headers.get("location");
}

describe("proxy", () => {
  test("uses the accept-language header without a cookie", () => {
    expect(redirectFor({ "accept-language": "pt-BR,pt;q=0.9" })).toBe("http://localhost/pt-BR");
    expect(redirectFor({ "accept-language": "en-US" })).toBe("http://localhost/en");
    expect(redirectFor({})).toBe("http://localhost/en");
  });

  test("prefers the saved locale cookie over the header", () => {
    expect(redirectFor({ cookie: "devlingo_locale=en", "accept-language": "pt-BR" })).toBe(
      "http://localhost/en",
    );
    expect(redirectFor({ cookie: "devlingo_locale=pt-BR", "accept-language": "en" })).toBe(
      "http://localhost/pt-BR",
    );
  });

  test("ignores an unknown cookie value", () => {
    expect(redirectFor({ cookie: "devlingo_locale=fr", "accept-language": "pt" })).toBe(
      "http://localhost/pt-BR",
    );
  });
});
