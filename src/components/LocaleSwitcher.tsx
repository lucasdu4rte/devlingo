"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Locale } from "@/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "pt-BR" : "en";
  const href = pathname.replace(`/${locale}`, `/${other}`);

  function setLocaleCookie() {
    document.cookie = `devlingo_locale=${other}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <Link
      href={href}
      onClick={setLocaleCookie}
      aria-label={t(locale, "locale.switch")}
      className="flex h-11 min-w-11 items-center justify-center rounded-xl border-2 border-border px-2 text-xs font-bold text-muted"
    >
      {other === "en" ? "EN" : "PT"}
    </Link>
  );
}
