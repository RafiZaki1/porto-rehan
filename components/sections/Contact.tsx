"use client";

// Kontak: tautan hanya ditampilkan jika datanya sudah diisi (tidak ada tautan kosong).
// Form sederhana membuka mailto: dan hanya muncul jika email sudah ada.

import { useState, type FormEvent } from "react";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Contact() {
  const { contact } = portfolio;
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const socials = [
    contact.instagram && { key: "ig", href: `https://instagram.com/${contact.instagram}`, label: `Instagram @${contact.instagram}`, icon: <InstagramIcon className="h-5 w-5" /> },
    contact.github && { key: "gh", href: contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`, label: "GitHub", icon: <GithubIcon className="h-5 w-5" /> },
    contact.linkedin && { key: "li", href: contact.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-5 w-5" /> },
  ].filter(Boolean) as { key: string; href: string; label: string; icon: React.ReactNode }[];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!contact.email) return;
    const subject = encodeURIComponent(`Pesan dari portofolio — ${name || "tanpa nama"}`);
    const body = encodeURIComponent(`${message}\n\nDari: ${name}${from ? ` <${from}>` : ""}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="kontak" aria-labelledby="judul-kontak" className="relative bg-[var(--bg2)] py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <Reveal className="cta relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[linear-gradient(135deg,var(--dark),var(--primary))] p-8 text-white md:p-12">
          <p className="eyebrow !text-[#7dd3fc]">Kontak</p>
          <h2 id="judul-kontak" className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight">
            Mari berkolaborasi.
          </h2>
          <p className="mt-3 max-w-[56ch] text-white/80">{portfolio.profile.quote}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-[#0B2A6F] hover:bg-[#e6edf7]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
              <span className="sr-only">(membuka tab baru)</span>
            </a>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="btn btn-outline !border-white/30 !bg-white/10 !text-white">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            )}
          </div>

          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
              <span>{contact.phone}</span>
            </li>
            {contact.email && (
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
                <span>{contact.email}</span>
              </li>
            )}
            {contact.website && (
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
                <a href={`https://${contact.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {contact.website}
                  <span className="sr-only">(membuka tab baru)</span>
                </a>
              </li>
            )}
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#7dd3fc]" aria-hidden="true" />
              <span>{contact.address}</span>
            </li>
          </ul>

          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Media sosial">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                  >
                    {s.icon}
                    {s.label}
                    <span className="sr-only">(membuka tab baru)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {contact.email && (
          <Reveal className="glass mt-8 p-6 md:p-8">
            <h3 className="text-lg font-bold">Kirim pesan</h3>
            <form onSubmit={onSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="font-semibold">Nama</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-semibold">Email Anda</span>
                <input
                  required
                  type="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  autoComplete="email"
                  className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <label className="grid gap-1.5 text-sm md:col-span-2">
                <span className="font-semibold">Pesan</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--accent)]"
                />
              </label>
              <div className="md:col-span-2">
                <button type="submit" className="btn btn-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Kirim lewat email
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
