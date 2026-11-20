# Portofolio Reyhan Bagus.P

Portofolio pribadi Software Developer dengan ID card 3D yang tergantung di tali lanyard pada hero section.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- three, @react-three/fiber, @react-three/drei, @react-three/rapier, meshline (ID card 3D)
- framer-motion (animasi scroll dan section)
- lucide-react (icon)

## Struktur folder

```
app/
  layout.tsx                 metadata, font, JSON-LD, script tema
  page.tsx                   susunan section
  globals.css                token warna (dark default, light lewat data-theme) dan gaya dasar
  projects/[slug]/page.tsx   halaman detail project
components/
  hero/
    Hero.tsx                 hero: teks + kartu 3D
    LanyardScene.tsx         pembungkus client: tekstur, deteksi WebGL, dynamic import
    Lanyard.tsx              scene 3D: tali (Rapier + meshline), kartu, drag
    cardTexture.ts           tekstur kartu dan tali dari canvas 2D
  sections/                  About, Skills, Projects, Certifications, Achievements,
                             Education, Hobbies, Contact, Footer, Navbar
  ui/                        Reveal, ProgressBar, SectionTitle, ThemeToggle,
                             CurrentYear, BrandIcons
data/
  portfolio.ts               SATU-SATUNYA sumber isi konten
types/
  portfolio.ts               tipe TypeScript untuk seluruh data
  three-elements.d.ts        deklarasi elemen meshline untuk JSX
public/
  icon.svg                   favicon (monogram RB)
  images/profile/            foto profil (placeholder dulu)
  images/logos/              logo sekolah (placeholder dulu)
  cv/                        file CV (PDF)
```

## Menjalankan di komputer

Butuh Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Build produksi:

```bash
npm run build
npm run start
```

## Cara mengedit konten

Semua teks, angka, dan tautan ada di `data/portfolio.ts`. Komponen tidak menulis konten secara langsung, jadi cukup ubah data di sana. Tipenya ada di `types/portfolio.ts`.

Nilai yang belum tersedia ditandai `TODO` di data. Tautan yang bernilai `null` tidak ditampilkan, sehingga tidak ada tautan mati di halaman.

## Yang perlu diganti sebelum dikirim

- [ ] **Foto profil**: letakkan foto asli di `public/images/profile/` lalu ubah `profile.photo` di data. Saat ini masih placeholder SVG.
- [ ] **File CV**: letakkan PDF di `public/cv/reyhan-cv.pdf` (atau ubah `profile.cvUrl`).
- [ ] **Logo sekolah**: ganti `public/images/logos/smkn2-mojokerto.svg` dengan logo asli, atau ubah `education.logo`.
- [ ] **Email, GitHub, LinkedIn**: isi di `contact` jika ada. Jika `email` diisi, form kontak otomatis tampil.
- [ ] **Instagram dan website**: data sekarang memakai `@reallygreatsite` dan `www.reallygreatsite.com` dari CV. Pastikan ini memang akun dan situs Anda, atau ganti.
- [ ] **Tautan project**: isi `demoUrl` dan `repoUrl` di `projects`. Jika kosong, tombol tampil sebagai "segera".
- [ ] **Gambar sertifikat**: isi `image` di `certifications` jika sudah punya gambarnya.
- [ ] **URL situs**: ganti `SITE_URL` di `app/layout.tsx` setelah deploy.

## Deploy ke Vercel

1. Push repo ke GitHub.
2. Di Vercel, pilih **Add New → Project**, lalu import repo tersebut.
3. Framework Preset dibiarkan **Next.js** (dideteksi otomatis). Build Command dan Output Directory dibiarkan default.
4. Klik **Deploy**.

## Catatan teknis

- **3D fallback**: jika WebGL tidak tersedia, hero menampilkan gambar kartu statis yang dibuat dari canvas.
- **Mobile**: canvas memakai dpr maksimal 1.5 di layar kecil agar lebih ringan.
- **Tanpa file .glb**: kartu dibuat dari geometry three.js, dan tekstur kartu dibuat dari canvas 2D.
- **Animasi**: framer-motion dan 3D dinonaktifkan untuk pengguna `prefers-reduced-motion`.
- **Tanpa JavaScript**: konten tetap terbaca. Tombol menu mobile tidak berfungsi tanpa JavaScript.
- **Cetak**: gaya cetak menyederhanakan halaman dan menampilkan URL tautan setelah teksnya.
