"use client";

// Progress bar yang bertambah saat terlihat (CSS + IntersectionObserver).
// Tanpa JavaScript, bar langsung penuh sesuai nilainya.

import { useEffect, useRef } from "react";

export default function ProgressBar({ value, label }: { value: number; label: string }) {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fill.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-[rgba(56,189,248,0.12)]"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div
        ref={fill}
        className="bar-fill h-full rounded-full bg-gradient-to-r from-[var(--dark)] via-[var(--primary)] to-[var(--accent)]"
        style={{ "--w": `${value}%` } as React.CSSProperties}
      />
    </div>
  );
}
