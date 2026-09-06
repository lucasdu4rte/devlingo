import { describe, expect, test } from "vitest";
import en from "./en.json";
import ptBR from "./pt-BR.json";
import { localize, t } from "./index";

describe("t", () => {
  test("returns the english string", () => {
    expect(t("en", "lesson.check")).toBe("Check");
  });
  test("returns the pt-BR string", () => {
    expect(t("pt-BR", "lesson.check")).toBe("Verificar");
  });
  test("falls back to english when pt-BR lacks the key", () => {
    expect(t("pt-BR", "app.name")).toBe("devlingo");
  });
  test("interpolates variables", () => {
    expect(t("en", "track.unit", { n: 3 })).toBe("Unit 3");
  });
});

describe("localize", () => {
  test("picks the locale when present", () => {
    expect(localize("pt-BR", { en: "Hello", "pt-BR": "Olá" })).toBe("Olá");
  });
  test("falls back to english", () => {
    expect(localize("pt-BR", { en: "Hello" })).toBe("Hello");
  });
});

test("pt-BR has no key missing from en", () => {
  const unknown = Object.keys(ptBR).filter((key) => !(key in en));
  expect(unknown).toEqual([]);
});
