// SATU-SATUNYA sumber isi konten portofolio.
// Semua komponen membaca dari sini. Jangan tulis teks konten langsung di komponen.
// Nilai bertanda TODO belum tersedia: tautannya otomatis disembunyikan sampai diisi.

import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  profile: {
    name: "Reyhan Bagus.P",
    shortName: "Reyhan",
    initials: "RB",
    role: "Software Developer",
    photo: "/images/profile/reyhan.png",
    quote: "Keep Learning, Keep Coding, Build a Better Future.",
    intro: "Siswa kelas 12 RPL di SMKN 2 Mojokerto yang tertarik membangun aplikasi dan website.",
    about:
      "Saya adalah siswa kelas 12 di SMKN 2 Mojokerto jurusan RPL (Rekayasa Perangkat Lunak). Saya memiliki minat yang besar di bidang teknologi, khususnya pengembangan perangkat lunak (web developer). Saya senang belajar hal baru, berusaha menyelesaikan masalah dengan solusi kreatif, serta terus mengembangkan kemampuan di dunia IT.",
    location: "Mojokerto, Jawa Timur",
    cvUrl: "/cv/reyhan-cv.pdf", // TODO: letakkan file CV asli di path ini
  },

  contact: {
    phone: "0858856415281",
    whatsappNumber: "62858856415281",
    email: null, // TODO: isi email
    website: "www.reallygreatsite.com", // dari CV; pastikan ini memang situs Anda
    instagram: "reallygreatsite", // dari CV; pastikan ini memang akun Anda
    github: null, // TODO: isi username/URL GitHub
    linkedin: null, // TODO: isi URL LinkedIn
    address: "Jl. Raya Sambiroto Mlaten Puri, Mojokerto, Jawa Timur",
  },

  education: {
    school: "SMKN 2 Mojokerto",
    logo: "/images/logos/smkn2-mojokerto.svg", // TODO: ganti dengan logo asli
    major: "Rekayasa Perangkat Lunak (RPL)",
    grade: "Kelas 12",
    focus: "Pengembangan Perangkat Lunak & Teknologi Informasi",
  },

  skills: [
    {
      id: "programming",
      title: "Programming Languages",
      icon: "code",
      level: 80,
      items: ["PHP", "JavaScript", "Python"],
    },
    {
      id: "framework",
      title: "Web Framework",
      icon: "layers",
      level: 75,
      items: ["Laravel"],
    },
    {
      id: "database",
      title: "Database",
      icon: "database",
      level: 75,
      items: ["MySQL"],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      icon: "wrench",
      level: 70,
      items: ["Git", "VS Code", "Docker"],
    },
    {
      id: "other",
      title: "Other Skills",
      icon: "users",
      level: 75,
      items: ["Problem Solving", "Teamwork"],
    },
  ],

  certifications: [
    {
      id: "web-dev",
      title: "Web Development Certification",
      issuer: "Dicoding Indonesia",
      image: null, // TODO: isi path gambar sertifikat, mis. /images/certs/web-dev.jpg
    },
    {
      id: "basic-php",
      title: "Basic PHP Certification",
      issuer: null,
      image: null,
    },
    {
      id: "laravel",
      title: "Laravel Fundamentals Certificate",
      issuer: null,
      image: null,
    },
    {
      id: "database",
      title: "Database Management Certification",
      issuer: null,
      image: null,
    },
  ],

  achievements: [
    {
      id: "ukk-minarsih",
      title: "Mengikuti Pelatihan UKK Minarsih Tech",
    },
  ],

  projects: [
    {
      slug: "website-sekolah",
      title: "Website Sekolah",
      description:
        "Website profil sekolah menggunakan Laravel dan MySQL.",
      stack: ["Laravel", "MySQL"],
      demoUrl: null, // TODO: isi tautan demo
      repoUrl: null, // TODO: isi tautan repositori
      icon: "globe",
    },
    {
      slug: "aplikasi-manajemen-data-siswa",
      title: "Aplikasi Manajemen Data Siswa",
      description: "Aplikasi untuk mengelola data siswa berbasis web.",
      stack: ["PHP", "MySQL"],
      demoUrl: null,
      repoUrl: null,
      icon: "users",
    },
    {
      slug: "sistem-informasi-inventaris",
      title: "Sistem Informasi Inventaris",
      description: "Aplikasi untuk pencatatan barang menggunakan PHP.",
      stack: ["PHP"],
      demoUrl: null,
      repoUrl: null,
      icon: "package",
    },
  ],

  hobbies: [
    { id: "coding", label: "Coding", icon: "code" },
    { id: "gaming", label: "Gaming", icon: "gamepad" },
    { id: "learning", label: "Learning Technology", icon: "book" },
    { id: "photography", label: "Photography", icon: "camera" },
  ],
};
