import Image from "next/image";
import { GraduationCap, MapPin, Code2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  const { profile, education } = portfolio;

  const info = [
    { icon: GraduationCap, label: "Pendidikan", value: `${education.school} · ${education.grade}` },
    { icon: Code2, label: "Jurusan", value: education.major },
    { icon: MapPin, label: "Lokasi", value: profile.location },
    { icon: Code2, label: "Peran", value: profile.role },
  ];

  return (
    <section id="about" aria-labelledby="judul-about" className="relative overflow-hidden bg-[var(--bg2)] py-24">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-14 px-6 lg:grid-cols-[420px_1fr]">
        <Reveal className="relative mx-auto w-full max-w-[360px] lg:max-w-[420px]">
          {/* Cincin dekoratif di belakang foto */}
          <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-[rgba(56,189,248,0.45)]" aria-hidden="true" />
          <div className="absolute -inset-5 rounded-full border border-[rgba(56,189,248,0.15)]" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-[0_0_0_6px_var(--primary),0_30px_80px_-20px_rgba(30,91,216,0.6)]">
            <Image
              src={profile.photo}
              alt={`Foto profil ${profile.name}`}
              fill
              sizes="(max-width: 1024px) 360px, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow">About Me</p>
          <h2 id="judul-about" className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight">
            Tentang <span className="heading-gradient">saya</span>
          </h2>
          <p className="mt-5 max-w-[62ch] text-[var(--muted)]">{profile.about}</p>

          <blockquote className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-lg font-semibold italic">
            “{profile.quote}”
          </blockquote>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass flex items-start gap-3 p-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[rgba(30,91,216,0.18)] text-[var(--accent-ink)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs text-[var(--muted)]">{label}</dt>
                  <dd className="text-sm font-semibold leading-snug">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
