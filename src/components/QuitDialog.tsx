"use client";

import { useEffect, useRef } from "react";
import { t, type Locale } from "@/i18n";
import { Button } from "./Button";

export function QuitDialog({
  locale,
  onQuit,
  onStay,
}: {
  locale: Locale;
  onQuit: () => void;
  onStay: () => void;
}) {
  const stayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onStay();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onStay]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    stayRef.current?.focus();
    return () => previous?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-20" onClick={onStay}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quit-title"
        onClick={(e) => e.stopPropagation()}
        className="slide-up absolute inset-x-4 bottom-4 mx-auto flex max-w-md flex-col gap-3 rounded-2xl border-2 border-border bg-surface p-4 shadow-2xl"
      >
        <h2 id="quit-title" className="font-display text-lg font-bold">
          {t(locale, "lesson.quitTitle")}
        </h2>
        <p className="text-sm leading-relaxed text-muted">{t(locale, "lesson.quitBody")}</p>
        <Button ref={stayRef} variant="primary" onClick={onStay}>
          {t(locale, "lesson.quitStay")}
        </Button>
        <button
          type="button"
          onClick={onQuit}
          className="min-h-11 rounded-2xl text-[15px] font-extrabold uppercase tracking-wider text-bad-text"
        >
          {t(locale, "lesson.quitConfirm")}
        </button>
      </div>
    </div>
  );
}
