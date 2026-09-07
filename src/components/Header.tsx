"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { t, type Locale } from "@/i18n";
import { EMPTY, load } from "@/lib/progress";
import { Bolt, Flame } from "./icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, trackId }: { locale: Locale; trackId: string }) {
  const [progress, setProgress] = useState(EMPTY);
  useEffect(() => setProgress(load()), []);

  return (
    <header className="sticky top-0 z-10 border-b-2 border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 lg:px-12">
        <Link
          href={`/${locale}/${trackId}`}
          className="font-display text-xl font-extrabold tracking-tight text-primary"
        >
          {t(locale, "app.name")}
        </Link>
        <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-3">
          <span
            className="flex items-center gap-1 font-bold text-streak"
            title={t(locale, "header.streak")}
          >
            <Flame size={18} />
            {progress.streak}
          </span>
          <span
            className="flex items-center gap-1 font-bold text-xp"
            title={t(locale, "header.xp")}
          >
            <Bolt size={18} />
            {progress.xp}
          </span>
          <ThemeToggle locale={locale} />
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
