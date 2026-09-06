import { t, type Locale } from "@/i18n";

export function FillBlank({
  locale,
  answer,
  checked,
  correct,
  onChange,
}: {
  locale: Locale;
  answer: string;
  checked: boolean;
  correct: boolean;
  onChange: (answer: string) => void;
}) {
  let border = "border-border";
  if (checked) border = correct ? "border-ok" : "border-bad";
  return (
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
  );
}
