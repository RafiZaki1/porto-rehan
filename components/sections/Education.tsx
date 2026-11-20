import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

// Pendidikan sebagai timeline kartu
export default function Education() {
  const { education } = portfolio;

  return (
    <section id="education" aria-labelledby="judul-education" className="relative bg-[var(--bg2)] py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-education" eyebrow="Education" title="Pendidikan" highlight="Pendidikan" />

        <ol className="relative ml-3 border-l border-[var(--line)] pl-8">
          <Reveal as="li" className="relative">
            <span className="absolute -left-[41px] top-7 h-3.5 w-3.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" aria-hidden="true" />
            <article className="glass flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
              <div className="grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-2xl bg-white p-1.5">
                <Image src={education.logo} alt={`Logo ${education.school}`} width={56} height={56} unoptimized className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-extrabold">{education.school}</h3>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                  <dt className="text-[var(--muted)]">Jurusan</dt>
                  <dd className="font-semibold">{education.major}</dd>
                  <dt className="text-[var(--muted)]">Kelas</dt>
                  <dd className="font-semibold">{education.grade}</dd>
                  <dt className="text-[var(--muted)]">Fokus</dt>
                  <dd className="font-semibold">{education.focus}</dd>
                </dl>
              </div>
            </article>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
