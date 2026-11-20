import { BookOpen, Camera, Code2, Gamepad2, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { Hobby } from "@/types/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const ICONS: Record<Hobby["icon"], LucideIcon> = {
  code: Code2,
  gamepad: Gamepad2,
  book: BookOpen,
  camera: Camera,
};

export default function Hobbies() {
  return (
    <section id="hobbies" aria-labelledby="judul-hobbies" className="relative py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-hobbies" eyebrow="Hobbies" title="Hobi di luar kelas" highlight="luar kelas" />

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {portfolio.hobbies.map((hobby, i) => {
            const Icon = ICONS[hobby.icon];
            return (
              <Reveal as="li" key={hobby.id} delay={i * 0.05} className="glass p-6 text-center transition hover:-translate-y-1 hover:border-[var(--accent)]">
                <Icon className="mx-auto mb-3 h-8 w-8 text-[var(--accent-ink)]" aria-hidden="true" />
                <span className="text-sm font-semibold">{hobby.label}</span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
