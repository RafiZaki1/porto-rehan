"use client";

// Tahun berjalan. Dihitung di browser agar build statis tidak membeku di tahun build.
// Nilai awal 2026 dipakai saat JavaScript belum jalan.

import { useEffect, useState } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
