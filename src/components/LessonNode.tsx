import type { LessonStatus } from "@/lib/progress";
import { Lock, Play, Star } from "./icons";

const styles: Record<LessonStatus, string> = {
  completed: "bg-ok text-ok-on shadow-[0_7px_0_var(--ok-dark)]",
  current:
    "bg-primary text-white shadow-[0_7px_0_var(--primary-dark)] outline outline-[5px] outline-primary-soft ring-pulse",
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
  index,
  onClick,
}: {
  status: LessonStatus;
  label: string;
  offset: number;
  startLabel?: string;
  index: number;
  onClick: () => void;
}) {
  const Icon = icons[status];
  return (
    <div className="node-enter" style={{ animationDelay: `${index * 60}ms` }}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        style={{ transform: `translateX(${offset}px)` }}
        className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${styles[status]}`}
      >
        {startLabel && (
          <span className="absolute -top-10 rounded-xl border-2 border-border bg-surface px-2.5 py-1.5 text-xs font-extrabold tracking-wider text-primary float">
            {startLabel}
          </span>
        )}
        <Icon size={26} />
      </button>
    </div>
  );
}

export function ComingSoonNode({ offset, index }: { offset: number; index: number }) {
  return (
    <div className="node-enter" style={{ animationDelay: `${index * 60}ms` }}>
      <div
        style={{ transform: `translateX(${offset}px)` }}
        className="h-16 w-16 shrink-0 rounded-full border-[3px] border-dashed border-border"
      />
    </div>
  );
}
