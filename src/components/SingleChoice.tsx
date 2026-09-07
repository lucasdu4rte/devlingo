import type { SingleChoice as Exercise } from "@/content/types";
import { isCode, localize, type Locale } from "@/i18n";
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
  order,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number | null;
  checked: boolean;
  reveal: boolean;
  correct: boolean;
  onChange: (answer: number) => void;
  labelledBy: string;
  order: number[];
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
      {order.map((i, position) => (
        <Option
          key={i}
          kind="radio"
          index={position}
          state={stateOf(i)}
          label={localize(locale, exercise.options[i])}
          mono={isCode(exercise.options[i])}
          checked={answer === i}
          disabled={checked}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}
