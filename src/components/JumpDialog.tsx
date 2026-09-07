"use client";

import Link from "next/link";
import { useRef } from "react";
import { t, type Locale } from "@/i18n";
import { CHALLENGE_MAX_MISTAKES, CHALLENGE_SIZE, CHALLENGE_XP } from "@/lib/challenge";
import { buttonClass } from "./Button";
import { Dialog } from "./Dialog";
import { Bolt } from "./icons";

export function JumpDialog({
  unitTitle,
  href,
  locale,
  onClose,
}: {
  unitTitle: string;
  href: string;
  locale: Locale;
  onClose: () => void;
}) {
  const startRef = useRef<HTMLAnchorElement>(null);
  return (
    <Dialog labelledBy="jump-title" onClose={onClose} initialFocus={startRef} className="border-xp">
      <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-xp">
        <Bolt size={13} />
        {t(locale, "track.jumpHere")}
      </div>
      <div id="jump-title" className="font-display text-lg font-bold">
        {t(locale, "track.jumpTitle", { unit: unitTitle })}
      </div>
      <p className="text-sm leading-relaxed text-muted">
        {t(locale, "track.jumpBody", { n: CHALLENGE_SIZE, mistakes: CHALLENGE_MAX_MISTAKES })}
      </p>
      <p className="mb-2 text-sm font-bold text-xp">
        {t(locale, "track.jumpReward", { xp: CHALLENGE_XP })}
      </p>
      <Link ref={startRef} href={href} className={buttonClass("primary", "text-center")}>
        {t(locale, "track.jumpStart")}
      </Link>
    </Dialog>
  );
}
