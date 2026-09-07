import type { LessonStatus } from "@/lib/progress";
import { Lock, Star } from "./icons";

const styles: Record<LessonStatus, string> = {
  completed: "bg-xp text-canvas shadow-[0_5px_0_var(--xp-dark)]",
  current: "border-2 border-dashed border-xp bg-surface text-xp",
  locked: "bg-locked text-locked-text shadow-[0_5px_0_var(--locked-dark)]",
};

export function SideQuestNode({
  status,
  label,
  side,
  onClick,
}: {
  status: LessonStatus;
  label: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = status === "locked" ? Lock : Star;
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute top-1/2 h-0 w-10 -translate-y-1/2 border-t-2 border-dashed border-border ${side === "left" ? "left-14" : "right-14"}`}
      />
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={`absolute top-1/2 ${side === "left" ? "left-0" : "right-0"} flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full ${styles[status]}`}
      >
        <Icon size={22} />
      </button>
    </>
  );
}
