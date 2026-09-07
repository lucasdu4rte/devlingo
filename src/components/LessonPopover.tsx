"use client";

import Link from "next/link";
import { useRef } from "react";
import type { LessonRef } from "@/content/tracks";
import { localize, t, type Locale } from "@/i18n";
import type { LessonStatus } from "@/lib/progress";
import { Button, buttonClass } from "./Button";
import { Dialog } from "./Dialog";
import { Lock } from "./icons";
import { RichText } from "./RichText";

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

  return (
    <Dialog
      labelledBy={titleId}
      onClose={onClose}
      initialFocus={locked ? undefined : startLinkRef}
      className={locked ? "border-border" : "border-primary"}
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
        <RichText text={localize(locale, lesson.lesson.description)} />
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
    </Dialog>
  );
}
