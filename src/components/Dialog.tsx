"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

export function Dialog({
  labelledBy,
  onClose,
  initialFocus,
  className = "border-border",
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  initialFocus?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && cardRef.current) trapFocus(e, cardRef.current);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const target = initialFocus?.current ?? cardRef.current;
    target?.focus();
    return () => previous?.focus();
  }, [initialFocus]);

  return (
    <div className="fixed inset-0 z-20" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`slide-up absolute inset-x-4 bottom-4 mx-auto flex max-w-md flex-col gap-1.5 rounded-2xl border-2 bg-surface p-4 shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e: KeyboardEvent, card: HTMLElement) {
  const focusable = card.querySelectorAll<HTMLElement>(FOCUSABLE);
  if (focusable.length === 0) {
    e.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const outside = !card.contains(document.activeElement);
  const edge = e.shiftKey ? first : last;
  if (!outside && document.activeElement !== edge) return;
  e.preventDefault();
  (e.shiftKey ? last : first).focus();
}
