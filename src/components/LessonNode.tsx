import type { LessonStatus } from "@/lib/progress";
import { Lock, Play, Star } from "./icons";

const styles: Record<LessonStatus, string> = {
  completed: "bg-ok text-ok-on shadow-[0_7px_0_var(--ok-dark)]",
  current:
    "bg-primary text-white shadow-[0_7px_0_var(--primary-dark)] outline outline-[5px] outline-primary-soft",
  locked: "bg-locked text-locked-text shadow-[0_7px_0_var(--locked-dark)]",
};

const icons: Record<LessonStatus, React.ComponentType<{ size?: number }>> = {
  completed: Star,
  current: Play,
  locked: Lock,
};

export function LessonNode({
  status,
  label,
  offset,
  startLabel,
  onClick,
}: {
  status: LessonStatus;
  label: string;
  offset: number;
  startLabel?: string;
  onClick: () => void;
}) {
  const Icon = icons[status];
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ transform: `translateX(${offset}px)` }}
      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${styles[status]}`}
    >
      {startLabel && (
        <span className="absolute -top-10 rounded-xl border-2 border-border bg-surface px-2.5 py-1.5 text-xs font-extrabold tracking-wider text-primary">
          {startLabel}
        </span>
      )}
      <Icon size={26} />
    </button>
  );
}

export function ComingSoonNode({ offset }: { offset: number }) {
  return (
    <div
      style={{ transform: `translateX(${offset}px)` }}
      className="h-16 w-16 shrink-0 rounded-full border-[3px] border-dashed border-border"
    />
  );
}
