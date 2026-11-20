import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GithubIcon } from "@/components/ui/BrandIcons";

type Params = { slug: string };

export function generateStaticParams() {
  return portfolio.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project tidak ditemukan" };
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="konten" className="circuit mx-auto min-h-[100svh] w-full max-w-[860px] px-6 py-16">
      <Link href="/#projects" className="btn btn-outline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Projects
      </Link>

      <article className="glass mt-8 p-8 md:p-10">
        <p className="eyebrow">Project</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight">{project.title}</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{project.description}</p>

        <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Teknologi</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-[rgba(30,91,216,0.16)] px-3 py-1.5 font-mono text-sm text-[var(--accent-ink)]">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Lihat Demo
            </a>
          ) : (
            <span aria-disabled="true" className="btn btn-outline opacity-50">
              Demo segera hadir
            </span>
          )}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          ) : (
            <span aria-disabled="true" className="btn btn-outline opacity-50">
              Repositori segera hadir
            </span>
          )}
        </div>
      </article>
    </main>
  );
}
