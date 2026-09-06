"use client";

import { useRef } from "react";
import { t, type Locale } from "@/i18n";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

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

  return (
    <Dialog
      labelledBy="quit-title"
      onClose={onStay}
      initialFocus={stayRef}
      className="border-border gap-3"
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
    </Dialog>
  );
}
