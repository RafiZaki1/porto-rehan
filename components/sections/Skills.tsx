import { Code2, Database, Layers, Users, Wrench, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { SkillCategory } from "@/types/portfolio";
import Reveal from "@/components/ui/Reveal";
import ProgressBar from "@/components/ui/ProgressBar";
import SectionTitle from "@/components/ui/SectionTitle";

const ICONS: Record<SkillCategory["icon"], LucideIcon> = {
  code: Code2,
  layers: Layers,
  database: Database,
  wrench: Wrench,
  users: Users,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="judul-skills" className="circuit relative py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-skills" eyebrow="Skills" title="Kemampuan teknis" highlight="teknis" />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <Reveal as="li" key={cat.id} delay={i * 0.05} className="glass p-6">
                <article aria-labelledby={`skill-${cat.id}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[rgba(30,91,216,0.18)] text-[var(--accent-ink)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 id={`skill-${cat.id}`} className="text-base font-bold">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-[var(--accent-ink)]">{cat.level}%</span>
                  </div>

                  <ul className="my-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[rgba(56,189,248,0.25)] bg-[rgba(30,91,216,0.16)] px-3 py-1 text-[12.5px] text-[var(--text)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ProgressBar value={cat.level} label={`Tingkat ${cat.title}: ${cat.level}%`} />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
