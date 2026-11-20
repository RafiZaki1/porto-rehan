"use client";

// Hero card. Di desktop (layar lebar, WebGL tersedia, tanpa reduce-motion) kartu 3D
// dimuat dinamis. Di mobile dan kondisi lain, tampil kartu statis yang digambar dari canvas 2D.
// Dengan begitu bundle three.js + physics tidak dimuat di HP.

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createCardCanvases, type CardCanvases } from "./cardTexture";
import { portfolio } from "@/data/portfolio";

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => <SceneLoader />,
});

function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center" role="status">
      <span className="sr-only">Memuat kartu…</span>
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" aria-hidden="true" />
    </div>
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function LanyardScene() {
  const [canvases, setCanvases] = useState<CardCanvases | null>(null);
  const [use3D, setUse3D] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUse3D(!reduce && supportsWebGL());

    let alive = true;
    createCardCanvases(portfolio.profile.photo)
      .then((c) => alive && setCanvases(c))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  if (!canvases || use3D === null) return <SceneLoader />;
  if (use3D) return <Lanyard canvases={canvases} />;
  return <StaticCard front={canvases.front} />;
}

// Kartu statis: canvas 2D yang sama, tanpa WebGL
function StaticCard({ front }: { front: HTMLCanvasElement }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    front.className = "h-auto w-[min(250px,62vw)] rounded-[18px] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.7)]";
    front.setAttribute("role", "img");
    front.setAttribute("aria-label", "ID card Reyhan Bagus.P, Software Developer, SMKN 2 Mojokerto");
    el.appendChild(front);
    return () => {
      front.remove();
    };
  }, [front]);

  return <div ref={box} className="flex h-full w-full items-center justify-center" />;
}
