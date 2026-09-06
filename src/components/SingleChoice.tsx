import type { SingleChoice as Exercise } from "@/content/types";
import { localize, type Locale } from "@/i18n";
import { Option, type OptionState } from "./Option";

export function SingleChoice({
  exercise,
  locale,
  answer,
  checked,
  onChange,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number | null;
  checked: boolean;
  onChange: (answer: number) => void;
}) {
  function stateOf(i: number): OptionState {
    if (!checked) return answer === i ? "selected" : "idle";
    if (i === exercise.correct) return "right";
    if (i === answer) return "wrong";
    return "idle";
  }
  return (
    <div role="radiogroup" className="flex flex-col gap-2.5">
      {exercise.options.map((option, i) => (
        <Option
          key={i}
          kind="radio"
          index={i}
          state={stateOf(i)}
          label={localize(locale, option)}
          checked={answer === i}
          disabled={checked}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}
