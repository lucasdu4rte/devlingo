"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localize, t, type Locale } from "@/i18n";
import { EMPTY, getStreakStatus, load, type StreakStatus } from "@/lib/progress";
import { Dialog } from "./Dialog";
import { Bolt, Check, ChevronDown, Flame } from "./icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const ALL_TRACKS = [
  {
    id: "react",
    title: "React",
    active: true,
    desc: {
      en: "The UI library for modern web apps",
      "pt-BR": "A biblioteca de UI para a web moderna",
    },
  },
  {
    id: "typescript",
    title: "TypeScript",
    active: false,
    desc: {
      en: "Types, generics, utility types and patterns",
      "pt-BR": "Tipos, generics, utility types e padrões",
    },
  },
  {
    id: "nextjs",
    title: "Next.js",
    active: false,
    desc: {
      en: "App router, server components and caching",
      "pt-BR": "App router, server components e cache",
    },
  },
  {
    id: "web-fundamentals",
    title: "Web Fundamentals",
    active: false,
    desc: {
      en: "Modern CSS, semantic HTML and DOM APIs",
      "pt-BR": "CSS moderno, HTML semântico e APIs DOM",
    },
  },
  {
    id: "nodejs",
    title: "Node.js",
    active: false,
    desc: {
      en: "Event loop, streams and async runtime",
      "pt-BR": "Event loop, streams e runtime assíncrono",
    },
  },
];

export function Header({ locale, trackId }: { locale: Locale; trackId: string }) {
  const [progress, setProgress] = useState(EMPTY);
  const [selectorOpen, setSelectorOpen] = useState(false);
  useEffect(() => setProgress(load()), []);

  const streakStatus = getStreakStatus(progress);

  return (
    <header className="sticky top-0 z-10 border-b-2 border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 lg:px-12">
        <div className="flex items-center gap-2.5">
          <Link
            href={`/${locale}/${trackId}`}
            className="font-display text-xl font-extrabold tracking-tight text-primary"
          >
            {t(locale, "app.name")}
          </Link>
          <button
            type="button"
            onClick={() => setSelectorOpen(true)}
            aria-label={t(locale, "track.selectTrack")}
            className="flex items-center gap-1.5 rounded-xl border-2 border-border bg-surface-2 px-2.5 py-1 text-xs font-bold text-text transition-colors hover:border-primary/60"
          >
            <span className="capitalize">{trackId}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
        </div>
        <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-3">
          <span
            className={`flex items-center gap-1 font-bold ${streakStyle(streakStatus)}`}
            title={streakTitle(locale, streakStatus)}
          >
            <Flame size={18} />
            {streakStatus.count}
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

      {selectorOpen && (
        <Dialog labelledBy="track-selector-title" onClose={() => setSelectorOpen(false)}>
          <div id="track-selector-title" className="mb-2 font-display text-lg font-bold">
            {t(locale, "track.selectTrack")}
          </div>
          <div className="flex flex-col gap-2">
            {ALL_TRACKS.map((tItem) => {
              const isCurrent = tItem.id === trackId;
              return (
                <div
                  key={tItem.id}
                  className={`flex items-center justify-between rounded-xl border-2 p-3 transition-colors ${trackItemStyle(isCurrent, tItem.active)}`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-display text-sm font-bold">
                      <span>{tItem.title}</span>
                      {tItem.active ? (
                        <span className="rounded-full bg-ok/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ok-text">
                          {t(locale, "track.active")}
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                          {t(locale, "track.comingSoon")}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted">{localize(locale, tItem.desc)}</div>
                  </div>
                  {isCurrent && <Check size={18} className="text-primary" />}
                </div>
              );
            })}
          </div>
        </Dialog>
      )}
    </header>
  );
}

function streakStyle(status: StreakStatus) {
  if (status.activeToday) return "text-streak";
  if (status.atRisk) return "text-streak animate-pulse";
  return "text-muted";
}

function streakTitle(locale: Locale, status: StreakStatus) {
  if (status.activeToday) return t(locale, "header.streakActive", { n: status.count });
  if (status.atRisk) return t(locale, "header.streakAtRisk", { n: status.count });
  return t(locale, "header.streakZero");
}

function trackItemStyle(isCurrent: boolean, active: boolean) {
  if (isCurrent) return "border-primary bg-primary-soft/30";
  if (active) return "border-border bg-surface-2";
  return "border-border/60 bg-surface-2/40 opacity-75";
}
