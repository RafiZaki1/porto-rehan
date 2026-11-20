"use client";

// Tombol terang/gelap manual. Pilihan disimpan di localStorage (dengan try/catch).
// Default dark dipasang oleh script di layout.tsx sebelum render.

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* penyimpanan diblokir: pilihan berlaku untuk sesi ini */
    }
  }

  const label = theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="theme-toggle grid h-10 w-10 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition hover:border-[var(--accent)]"
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  );
}
