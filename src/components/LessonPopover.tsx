import Link from "next/link";
import type { LessonRef } from "@/content/tracks";
import { localize, t, type Locale } from "@/i18n";
import type { LessonStatus } from "@/lib/progress";
import { Button } from "./Button";
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
  return (
    <div className="fixed inset-0 z-20" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-x-4 bottom-4 mx-auto flex max-w-md flex-col gap-1.5 rounded-2xl border-2 bg-surface p-4 shadow-2xl ${locked ? "border-border" : "border-primary"}`}
      >
        <div
          className={`flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${locked ? "text-muted" : "text-primary"}`}
        >
          {locked && <Lock size={13} />}
          {t(locale, "track.lesson", { n: lesson.indexInUnit + 1 })} ·{" "}
          {localize(locale, lesson.unit.title)}
        </div>
        <div className="font-display text-lg font-bold">
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
          <Link href={href} className="block">
            <Button variant="primary" tabIndex={-1}>
              {t(locale, "track.start")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
