import { t, type Locale } from "@/i18n";
import { Bulb } from "./icons";

export type Hint = { left: number; enabled: boolean; onUse: () => void };

export function FillBlank({
  locale,
  answer,
  checked,
  correct,
  onChange,
  hint,
}: {
  locale: Locale;
  answer: string;
  checked: boolean;
  correct: boolean;
  onChange: (answer: string) => void;
  hint?: Hint;
}) {
  let border = "border-border";
  if (checked) border = correct ? "border-ok" : "border-bad";
  return (
    <div className="flex gap-2.5">
      <input
        type="text"
        value={answer}
        disabled={checked}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t(locale, "lesson.typeAnswer")}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className={`min-h-[52px] w-full rounded-2xl border-2 border-b-4 bg-surface px-4 py-3.5 font-mono text-[15px] text-text outline-none ${border}`}
      />
      {hint && (
        <button
          type="button"
          onClick={hint.onUse}
          disabled={!hint.enabled}
          aria-label={t(locale, "lesson.hint", { n: hint.left })}
          className="flex min-h-[52px] w-14 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-b-4 border-border bg-surface text-xp disabled:text-muted"
        >
          <Bulb size={20} />
          <span className="text-[11px] font-extrabold">{hint.left}</span>
        </button>
      )}
    </div>
  );
}
