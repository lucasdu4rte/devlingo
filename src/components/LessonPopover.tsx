"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { LessonRef } from "@/content/tracks";
import { localize, t, type Locale } from "@/i18n";
import type { LessonStatus } from "@/lib/progress";
import { Button, buttonClass } from "./Button";
import { Lock } from "./icons";

export function LessonPopover({
  lesson,
  status,
  locale,
  href,
  onClose,
}: {
  lesson: LessonRef;
  status: LessonStatus;
  locale: Locale;
  href: string;
  onClose: () => void;
}) {
  const locked = status === "locked";
  const titleId = `lesson-popover-title-${lesson.lesson.id}`;
  const startLinkRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    if (locked) {
      cardRef.current?.focus();
    } else {
      startLinkRef.current?.focus();
    }
    return () => previous?.focus();
  }, [locked]);

  return (
    <div className="fixed inset-0 z-20" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`slide-up absolute inset-x-4 bottom-4 mx-auto flex max-w-md flex-col gap-1.5 rounded-2xl border-2 bg-surface p-4 shadow-2xl ${locked ? "border-border" : "border-primary"}`}
      >
        <div
          className={`flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${locked ? "text-muted" : "text-primary"}`}
        >
          {locked && <Lock size={13} />}
          {t(locale, "track.lesson", { n: lesson.indexInUnit + 1 })} ·{" "}
          {localize(locale, lesson.unit.title)}
        </div>
        <div id={titleId} className="font-display text-lg font-bold">
          {localize(locale, lesson.lesson.title)}
        </div>
        <p className="mb-2 text-sm leading-relaxed text-muted">
          {localize(locale, lesson.lesson.description)}
          {!locked &&
            ` · ${t(locale, "track.exercises", { n: lesson.lesson.exercises.length, xp: lesson.lesson.xp })}`}
        </p>
        {locked ? (
          <Button variant="disabled">{t(locale, "track.locked")}</Button>
        ) : (
          <Link ref={startLinkRef} href={href} className={buttonClass("primary", "text-center")}>
            {t(locale, "track.start")}
          </Link>
        )}
      </div>
    </div>
  );
}
