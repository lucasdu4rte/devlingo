export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className="h-3.5 flex-1 overflow-hidden rounded-full border border-border bg-surface-2"
    >
      <div
        className="h-full rounded-full bg-ok transition-[width] duration-300"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}
