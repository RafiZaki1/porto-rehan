import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

// Heading: Plus Jakarta Sans. Isi: Inter. Label mono memakai font sistem.
const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://YOUR-DOMAIN.vercel.app"; // TODO: ganti setelah deploy
const TITLE = `${portfolio.profile.name} — ${portfolio.profile.role}`;
const DESCRIPTION = `Portofolio ${portfolio.profile.name}, ${portfolio.profile.role} dan siswa RPL SMKN 2 Mojokerto. ${portfolio.profile.quote}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s — ${portfolio.profile.name}` },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    siteName: portfolio.profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7FD" },
    { media: "(prefers-color-scheme: dark)", color: "#070B1A" },
  ],
};

// Tema dipasang sebelum render agar tidak berkedip. Default: dark.
const themeScript = `
(function () {
  var t = 'dark';
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') t = saved;
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.add('js');
})();
`;

// JSON-LD schema.org Person
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.profile.name,
  jobTitle: portfolio.profile.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mojokerto",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
  alumniOf: { "@type": "EducationalOrganization", name: portfolio.education.school },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-theme="dark"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
