// Membuat tekstur kartu ID dan tali dari canvas 2D (tanpa file .glb atau gambar eksternal).
// Dipakai oleh Lanyard.tsx. Hanya dijalankan di browser.

// Tidak mengimpor three.js: modul ini ikut dimuat di mobile (kartu statis),
// jadi tetap ringan. Tekstur three.js dibuat di Lanyard.tsx dari canvas ini.
import { portfolio } from "@/data/portfolio";

// Rasio ID card 54 x 86 mm
export const CARD_W = 540;
export const CARD_H = 860;

export type CardCanvases = {
  front: HTMLCanvasElement;
  back: HTMLCanvasElement;
  rope: HTMLCanvasElement;
};

// Foto diminta lewat optimizer Next (diperkecil dan dikonversi), bukan file mentah 660 KB.
function optimizedPhoto(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

// Gambar garis sirkuit tipis di latar
function drawCircuit(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
  ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
  ctx.lineWidth = 2;
  const paths: [number, number][][] = [
    [[0, 170], [120, 170], [150, 200], [260, 200]],
    [[CARD_W, 300], [400, 300], [370, 330], [300, 330]],
    [[0, 640], [90, 640], [120, 610], [200, 610]],
    [[CARD_W, 720], [430, 720], [400, 750], [330, 750]],
    [[60, CARD_H], [60, 780], [90, 750], [90, 700]],
    [[480, 0], [480, 90], [450, 120], [390, 120]],
  ];
  paths.forEach((pts) => {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
    const [ex, ey] = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFront(photo: HTMLImageElement | null) {
  const { profile, education } = portfolio;
  const canvas = makeCanvas(CARD_W, CARD_H);
  const ctx = canvas.getContext("2d")!;

  // Latar gradasi biru tua -> biru
  const grad = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  grad.addColorStop(0, "#0B2A6F");
  grad.addColorStop(1, "#1E5BD8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  drawCircuit(ctx);

  // Header sekolah
  ctx.fillStyle = "#E6EDF7";
  ctx.font = "600 26px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${education.school.toUpperCase()} • RPL`, CARD_W / 2, 58);

  // Foto profil bulat
  const cx = CARD_W / 2;
  const cy = 262;
  const r = 128;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (photo) {
    // object-fit: cover
    const scale = Math.max((r * 2) / photo.width, (r * 2) / photo.height);
    const w = photo.width * scale;
    const h = photo.height * scale;
    ctx.drawImage(photo, cx - w / 2, cy - h / 2, w, h);
  } else {
    ctx.fillStyle = "#0B2A6F";
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.fillStyle = "#38BDF8";
    ctx.font = "700 110px Inter, Arial, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(profile.initials, cx, cy + 4);
    ctx.textBaseline = "alphabetic";
  }
  ctx.restore();

  // Nama, role, sekolah
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 44px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("REYHAN BAGUS P.", cx, 478);

  ctx.fillStyle = "#38BDF8";
  ctx.font = "700 28px monospace";
  ctx.fillText(profile.role.toUpperCase(), cx, 528);

  ctx.fillStyle = "#CBD5E1";
  ctx.font = "500 24px 'Inter', Arial, sans-serif";
  ctx.fillText(`${education.grade} • ${education.major.split(" (")[0]}`, cx, 566);

  // Ikon </> di pojok kanan bawah
  const bx = CARD_W - 118;
  const by = CARD_H - 118;
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(bx, by, 84, 84, 16);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 34px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", bx + 42, by + 44);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // Teks kecil kiri bawah
  ctx.fillStyle = "rgba(230,237,247,0.7)";
  ctx.font = "500 20px monospace";
  ctx.fillText("ID · 2026", 50, CARD_H - 60);

  return canvas;
}

function drawBack() {
  const { profile } = portfolio;
  const canvas = makeCanvas(CARD_W, CARD_H);
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(CARD_W, 0, 0, CARD_H);
  grad.addColorStop(0, "#1E5BD8");
  grad.addColorStop(1, "#0B2A6F");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  drawCircuit(ctx);

  const cx = CARD_W / 2;
  ctx.textAlign = "center";

  // Monogram RB
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 190px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(profile.initials, cx, 330);
  ctx.textBaseline = "alphabetic";

  // Quote
  ctx.fillStyle = "#38BDF8";
  ctx.font = "700 34px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("Keep Learning,", cx, 560);
  ctx.fillText("Keep Coding,", cx, 606);
  ctx.fillText("Build a Better Future.", cx, 652);

  ctx.fillStyle = "rgba(230,237,247,0.75)";
  ctx.font = "500 22px monospace";
  ctx.fillText(portfolio.education.school.toUpperCase(), cx, CARD_H - 70);

  return canvas;
}

function drawRope() {
  const canvas = makeCanvas(1024, 128);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1E5BD8";
  ctx.fillRect(0, 0, 1024, 128);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 60px monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("REYHAN • SOFTWARE DEVELOPER • ", 16, 66);
  return canvas;
}

// Dipanggil sekali di browser. Jika foto gagal dimuat, pakai inisial.
export async function createCardCanvases(photoSrc: string): Promise<CardCanvases> {
  if (document.fonts?.ready) await document.fonts.ready;
  // Foto dikecilkan ke 640px untuk kartu; ukuran tekstur tidak perlu lebih besar
  const photo = await loadImage(optimizedPhoto(photoSrc, 640));
  return {
    front: drawFront(photo),
    back: drawBack(),
    rope: drawRope(),
  };
}
