// Tipe data untuk seluruh isi portofolio. Isi datanya ada di data/portfolio.ts.

export type Profile = {
  name: string; // nama lengkap untuk ditampilkan
  shortName: string; // nama singkat untuk logo / kartu
  initials: string; // inisial monogram
  role: string;
  photo: string; // path di /public
  quote: string;
  intro: string; // satu-dua kalimat untuk hero
  about: string;
  location: string;
  cvUrl: string; // path file CV di /public
};

export type Contact = {
  phone: string; // format lokal, contoh 0858...
  whatsappNumber: string; // format internasional tanpa +, contoh 62858...
  email: string | null;
  website: string | null;
  instagram: string | null; // username tanpa @
  github: string | null;
  linkedin: string | null;
  address: string;
};

export type Education = {
  school: string;
  logo: string; // path logo di /public
  major: string;
  grade: string;
  focus: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: "code" | "layers" | "database" | "wrench" | "users";
  level: number; // persentase dari CV, 0–100, berlaku untuk seluruh kategori
  items: string[];
};

export type Certification = {
  id: string;
  title: string;
  issuer: string | null;
  image: string | null; // path gambar sertifikat; null jika belum ada
};

export type Achievement = {
  id: string;
  title: string;
  description?: string; // opsional; kosongkan jika CV tidak memberi rinciannya
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  icon: "globe" | "users" | "package";
};

export type Hobby = {
  id: string;
  label: string;
  icon: "code" | "gamepad" | "book" | "camera";
};

export type Portfolio = {
  profile: Profile;
  contact: Contact;
  education: Education;
  skills: SkillCategory[];
  certifications: Certification[];
  achievements: Achievement[];
  projects: Project[];
  hobbies: Hobby[];
};
