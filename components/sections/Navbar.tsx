"use client";

// Navbar sticky: logo RB, link ke tiap section (menu aktif mengikuti scroll),
// tombol Hubungi Saya, tombol tema, dan menu hamburger di HP.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { portfolio } from "@/data/portfolio";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Sertifikasi" },
  { id: "contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu aktif: section yang sedang berada di tengah layar
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-[var(--line)] bg-[var(--surface-strong)] backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-6">
        <a href="#beranda" className="flex items-center gap-3 font-bold" aria-label={`${portfolio.profile.name}, kembali ke awal`}>
          <span
            className="grid h-9 w-9 place-items-center rounded-[10px] border border-[rgba(56,189,248,0.4)] text-sm font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--dark))" }}
            aria-hidden="true"
          >
            {portfolio.profile.initials}
          </span>
          <span className="hidden sm:inline">{portfolio.profile.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-[var(--line)] ${
                  active === id ? "text-[var(--accent-ink)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#kontak" className="btn btn-primary hidden !px-4 !py-2.5 md:inline-flex">
            Hubungi Saya
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <ul
        id="menu-mobile"
        hidden={!open}
        className="border-t border-[var(--line)] bg-[var(--surface-strong)] px-6 py-3 backdrop-blur-md md:hidden"
      >
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-[var(--text)]">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
