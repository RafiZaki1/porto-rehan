import { Trophy } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

// Timeline pencapaian
export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="judul-achievements" className="relative py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-achievements" eyebrow="Achievements" title="Pencapaian" highlight="Pencapaian" />

        <ol className="relative ml-3 border-l border-[var(--line)] pl-8">
          {portfolio.achievements.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[46px] top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#f5b84a] to-[#c47d0e] text-[#14213D]" aria-hidden="true">
                <Trophy className="h-4 w-4" />
              </span>
              <article className="glass p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                {item.description && <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
