import { ArrowDown, Download, Hand } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import LanyardScene from "./LanyardScene";

// Hero: teks di kiri (desktop) atau di bawah (mobile), kartu 3D di kanan (atau di atas).
export default function Hero() {
  const { profile } = portfolio;

  return (
    <section id="beranda" aria-labelledby="judul-hero" className="circuit relative min-h-[100svh] overflow-hidden pt-24 pb-10">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-6 px-6 md:grid-cols-2 md:gap-10">
        {/* Kartu 3D: di atas pada mobile, di kanan pada desktop */}
        <div className="order-1 md:order-2">
          <div className="relative h-[52svh] w-full touch-none md:h-[72svh]">
            <LanyardScene />
          </div>
          <p className="no-print mt-1 flex items-center justify-center gap-2 text-center text-sm text-[var(--muted)]">
            <Hand className="h-4 w-4" aria-hidden="true" />
            Tarik kartunya · klik untuk membalik
          </p>
        </div>

        {/* Teks: di bawah pada mobile, di kiri pada desktop */}
        <div className="order-2 md:order-1">
          <p className="eyebrow">{profile.role}</p>
          <h1 id="judul-hero" className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold leading-[1.05]">
            Halo, saya <span className="heading-gradient">{profile.shortName}</span>
          </h1>
          <p className="mt-4 text-lg font-semibold text-[var(--accent-ink)]">{profile.role}</p>
          <p className="mt-3 max-w-[46ch] text-[var(--muted)]">{profile.intro}</p>

          <div className="no-print mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              Lihat Project
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={profile.cvUrl} download className="btn btn-outline">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="no-print absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-[0.2em] text-[var(--muted)] md:flex"
        aria-label="Gulir ke bagian About"
      >
        SCROLL
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}
