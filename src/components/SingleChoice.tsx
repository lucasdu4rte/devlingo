import type { SingleChoice as Exercise } from "@/content/types";
import { localize, type Locale } from "@/i18n";
import { Option, type OptionState } from "./Option";

export function SingleChoice({
  exercise,
  locale,
  answer,
  checked,
  reveal,
  correct,
  onChange,
  labelledBy,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number | null;
  checked: boolean;
  reveal: boolean;
  correct: boolean;
  onChange: (answer: number) => void;
  labelledBy: string;
}) {
  function stateOf(i: number): OptionState {
    if (!checked) return answer === i ? "selected" : "idle";
    const picked = i === answer;
    if (!reveal) {
      if (!picked) return "idle";
      return correct ? "right" : "wrong";
    }
    if (i === exercise.correct) return "right";
    if (picked) return "wrong";
    return "idle";
  }
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-col gap-2.5">
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
