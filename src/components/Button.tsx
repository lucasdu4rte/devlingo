import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-white shadow-[0_4px_0_var(--primary-dark)]",
  ok: "bg-ok text-ok-on shadow-[0_4px_0_var(--ok-dark)]",
  bad: "bg-bad text-white shadow-[0_4px_0_var(--bad-dark)]",
  disabled: "bg-surface-2 text-muted",
};

export type ButtonVariant = keyof typeof variants;

type Props = ComponentProps<"button"> & { variant: ButtonVariant };

export function buttonClass(variant: ButtonVariant, className = "") {
  return `block w-full min-h-[50px] rounded-2xl px-4 py-3.5 text-[15px] font-extrabold uppercase tracking-wider transition-transform active:translate-y-[2px] active:shadow-none ${variants[variant]} ${className}`;
}

export function Button({ variant, className = "", ...rest }: Props) {
  return (
    <button
      disabled={variant === "disabled"}
      className={buttonClass(variant, className)}
      {...rest}
    />
  );
}
