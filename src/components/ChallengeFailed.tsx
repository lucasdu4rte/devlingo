import Link from "next/link";
import { t, type Locale } from "@/i18n";
import { CHALLENGE_MAX_MISTAKES } from "@/lib/challenge";
import { Button, buttonClass } from "./Button";
import { Close } from "./icons";

export function ChallengeFailed({
  locale,
  onRetry,
  trackHref,
}: {
  locale: Locale;
  onRetry: () => void;
  trackHref: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-6 text-center">
        <div className="pop flex h-16 w-16 items-center justify-center rounded-full bg-bad-soft text-bad-text">
          <Close size={32} />
        </div>
        <h1 className="font-display text-2xl font-extrabold">
          {t(locale, "challenge.failedTitle")}
        </h1>
        <p className="max-w-sm font-semibold text-muted">
          {t(locale, "challenge.failedBody", { n: CHALLENGE_MAX_MISTAKES })}
        </p>
      </div>
      <div className="flex flex-col gap-3 border-t-2 border-border bg-surface p-4 pb-6">
        <Button variant="primary" className="mx-auto max-w-md" onClick={onRetry}>
          {t(locale, "challenge.retry")}
        </Button>
        <Link href={trackHref} className={buttonClass("disabled", "mx-auto max-w-md text-center")}>
          {t(locale, "challenge.back")}
        </Link>
      </div>
    </div>
  );
}
