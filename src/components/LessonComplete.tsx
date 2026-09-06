import Link from "next/link";
import { t, type Locale } from "@/i18n";
import { buttonClass } from "./Button";
import { Bolt, Flame, Trophy } from "./icons";

export function LessonComplete({
  locale,
  subtitle,
  xp,
  streak,
  trackHref,
}: {
  locale: Locale;
  subtitle: string;
  xp: number;
  streak: number;
  trackHref: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-6 text-center">
        <Trophy size={64} className="text-xp" />
        <h1 className="font-display text-2xl font-extrabold">{t(locale, "lesson.complete")}</h1>
        <p className="font-semibold text-muted">{subtitle}</p>
        <div className="mt-3.5 flex w-full max-w-sm gap-3">
          <Stat
            label={t(locale, "lesson.xpEarned")}
            color="border-xp text-xp"
            icon={<Bolt size={18} />}
            value={String(xp)}
          />
          <Stat
            label={t(locale, "lesson.streak")}
            color="border-streak text-streak"
            icon={<Flame size={18} />}
            value={t(locale, "lesson.days", { n: streak })}
          />
        </div>
      </div>
      <div className="border-t-2 border-border bg-surface p-4 pb-6">
        <Link href={trackHref} className={buttonClass("primary", "mx-auto max-w-md text-center")}>
          {t(locale, "lesson.continue")}
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  color,
  icon,
  value,
}: {
  label: string;
  color: string;
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border-2 bg-surface p-3.5 ${color}`}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</div>
      <div className="flex items-center gap-1.5 font-display text-xl font-extrabold">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
