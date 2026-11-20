import Link from "next/link";
import { Globe, Package, Users, ArrowUpRight, type LucideIcon } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { portfolio } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const ICONS: Record<Project["icon"], LucideIcon> = {
  globe: Globe,
  users: Users,
  package: Package,
};

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="judul-projects" className="relative bg-[var(--bg2)] py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-projects" eyebrow="Projects" title="Project pilihan" highlight="pilihan" />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = ICONS[project.icon];
  const num = String(portfolio.projects.indexOf(project) + 1).padStart(2, "0");

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]">
      <div
        className="relative grid h-44 place-items-center overflow-hidden circuit"
        style={{ background: "linear-gradient(135deg, var(--dark), #123a95)" }}
        aria-hidden="true"
      >
        <span className="absolute left-4 top-3 font-mono text-xs text-white/60">{num}</span>
        <Icon className="h-14 w-14 text-white drop-shadow-[0_6px_18px_rgba(56,189,248,0.5)]" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold">
          {/* Seluruh kartu membuka halaman detail lewat tautan judul */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-[var(--muted)]">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-[rgba(30,91,216,0.16)] px-2.5 py-1 font-mono text-xs text-[var(--accent-ink)]">
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-4 flex gap-2">
          <ExternalButton href={project.demoUrl} label="Demo" icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />} />
          <ExternalButton href={project.repoUrl} label="GitHub" icon={<GithubIcon className="h-4 w-4" />} />
        </div>
      </div>
    </article>
  );
}

// Tombol tautan eksternal. Jika URL belum diisi, tampil sebagai tombol nonaktif (bukan tautan mati).
function ExternalButton({ href, label, icon }: { href: string | null; label: string; icon: React.ReactNode }) {
  if (!href) {
    return (
      <span aria-disabled="true" className="btn btn-outline opacity-50">
        {icon}
        {label} segera
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
      {icon}
      {label}
      <span className="sr-only">(membuka tab baru)</span>
    </a>
  );
}
