import { portfolio } from "@/data/portfolio";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import CurrentYear from "@/components/ui/CurrentYear";

export default function Footer() {
  const { profile, contact } = portfolio;

  const socials = [
    contact.instagram && { key: "ig", href: `https://instagram.com/${contact.instagram}`, label: "Instagram", icon: <InstagramIcon className="h-4 w-4" /> },
    contact.github && { key: "gh", href: contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`, label: "GitHub", icon: <GithubIcon className="h-4 w-4" /> },
    contact.linkedin && { key: "li", href: contact.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
  ].filter(Boolean) as { key: string; href: string; label: string; icon: React.ReactNode }[];

  return (
    <footer className="border-t border-[var(--line)] py-14 text-center">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <q className="mx-auto block max-w-[640px] text-[clamp(1.25rem,3vw,1.75rem)] font-bold leading-snug">
          {profile.quote}
        </q>

        {socials.length > 0 && (
          <ul className="mt-6 flex justify-center gap-3" aria-label="Media sosial">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-sm text-[var(--muted)]">
          © <CurrentYear /> {profile.name}
        </p>
      </div>
    </footer>
  );
}
