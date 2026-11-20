"use client";

// Grid sertifikat. Klik kartu membuka modal gambar (elemen <dialog> bawaan).
// Jika gambar belum diisi di data, modal menampilkan detail tanpa gambar.

import { useRef, useState } from "react";
import { Award, X } from "lucide-react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import type { Certification } from "@/types/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(cert: Certification) {
    setSelected(cert);
    dialogRef.current?.showModal();
  }
  function close() {
    dialogRef.current?.close();
  }

  return (
    <section id="certifications" aria-labelledby="judul-certs" className="relative bg-[var(--bg2)] py-24">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionTitle id="judul-certs" eyebrow="Certifications" title="Sertifikasi" highlight="Sertifikasi" />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {portfolio.certifications.map((cert, i) => (
            <Reveal as="li" key={cert.id} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => open(cert)}
                className="glass flex w-full items-start gap-4 p-5 text-left transition hover:border-[var(--accent)]"
                aria-haspopup="dialog"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] text-white">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold leading-snug">{cert.title}</span>
                  {cert.issuer && <span className="text-sm text-[var(--muted)]">{cert.issuer}</span>}
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="judul-cert-modal"
        onClick={(e) => {
          // Klik di luar konten menutup modal
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(92vw,640px)] rounded-2xl border border-[var(--line)] bg-[var(--bg2)] p-0 text-[var(--text)] shadow-2xl backdrop:bg-black/70"
      >
        {selected && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="judul-cert-modal" className="text-lg font-bold">
                  {selected.title}
                </h3>
                {selected.issuer && <p className="text-sm text-[var(--muted)]">{selected.issuer}</p>}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Tutup"
                className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-[var(--line)]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface)]">
              {selected.image ? (
                <Image src={selected.image} alt={`Sertifikat ${selected.title}`} width={1200} height={900} className="h-full w-full object-contain" />
              ) : (
                <p className="px-6 text-center text-sm text-[var(--muted)]">Gambar sertifikat belum tersedia.</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
