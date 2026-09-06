import type { MultiChoice as Exercise } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { Option, type OptionState } from "./Option";

export function MultiChoice({
  exercise,
  locale,
  answer,
  checked,
  onChange,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number[];
  checked: boolean;
  onChange: (answer: number[]) => void;
}) {
  function stateOf(i: number): OptionState {
    const picked = answer.includes(i);
    if (!checked) return picked ? "selected" : "idle";
    if (exercise.correct.includes(i)) return "right";
    if (picked) return "wrong";
    return "idle";
  }
  function toggle(i: number) {
    onChange(answer.includes(i) ? answer.filter((v) => v !== i) : [...answer, i]);
  }
  return (
    <div className="flex flex-col gap-2.5">
      <div className="-mt-2 text-sm text-muted">{t(locale, "lesson.selectAll")}</div>
      {exercise.options.map((option, i) => (
        <Option
          key={i}
          kind="check"
          index={i}
          state={stateOf(i)}
          label={localize(locale, option)}
          disabled={checked}
          onClick={() => toggle(i)}
        />
      ))}
    </div>
  );
}
