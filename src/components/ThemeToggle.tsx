"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/i18n";
import { Monitor, Moon, Sun } from "./icons";

type Theme = "dark" | "light" | "system";
const KEY = "devlingo:theme";
const order: Theme[] = ["dark", "light", "system"];

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(KEY);
    return order.includes(stored as Theme) ? (stored as Theme) : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: Theme) {
  const light =
    theme === "light" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.classList.toggle("light", light);
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => setTheme(readTheme()), []);

  function cycle() {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  const Icon = { dark: Moon, light: Sun, system: Monitor }[theme];
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t(locale, `theme.${theme}`)}
      className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border text-muted"
    >
      <Icon size={16} />
    </button>
  );
}
