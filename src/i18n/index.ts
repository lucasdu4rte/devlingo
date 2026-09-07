import type { Locale, Text } from "@/content/types";
import { locales } from "@/content/types";
import en from "./en.json";
import ptBR from "./pt-BR.json";

export { locales };
export type { Locale, Text };
export type MessageKey = keyof typeof en;

const messages: Record<Locale, Partial<Record<MessageKey, string>>> = { en, "pt-BR": ptBR };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function t(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}) {
  const template = messages[locale][key] ?? en[key];
  return Object.entries(vars).reduce(
    (out, [name, value]) => out.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

export function localize(locale: Locale, text: Text) {
  return text[locale] ?? text.en;
}

// ponytail: options written in English only are code by content convention; add a flag if that stops holding.
export function isCode(text: Text) {
  return !("pt-BR" in text);
}
