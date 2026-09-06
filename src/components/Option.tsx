import { Check } from "./icons";

export type OptionState = "idle" | "selected" | "right" | "wrong";

const box: Record<OptionState, string> = {
  idle: "border-border bg-surface text-text",
  selected: "border-primary bg-primary-soft text-text",
  right: "border-ok bg-ok-soft text-ok-text",
  wrong: "border-bad bg-bad-soft text-bad-text",
};
const marker: Record<OptionState, string> = {
  idle: "border-border text-muted",
  selected: "border-primary bg-primary text-white",
  right: "border-ok bg-ok text-ok-on",
  wrong: "border-bad bg-bad text-white",
};

export function Option({
  state,
  kind,
  index,
  label,
  disabled,
  onClick,
}: {
  state: OptionState;
  kind: "radio" | "check";
  index: number;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const showCheck = kind === "check" && state !== "idle";
  return (
    <button
      type="button"
      role={kind === "radio" ? "radio" : "checkbox"}
      aria-checked={state !== "idle"}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-[52px] w-full items-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-100 ${box[state]}`}
    >
      <span
        className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center border-2 text-xs ${kind === "radio" ? "rounded-lg" : "rounded-md"} ${marker[state]}`}
      >
        {kind === "radio" ? index + 1 : showCheck && <Check size={14} />}
      </span>
      <span>{label}</span>
    </button>
  );
}
