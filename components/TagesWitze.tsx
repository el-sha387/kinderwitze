"use client";

import { useEffect, useState } from "react";
import WitzCard from "@/components/WitzCard";
import { getAlleWitze, getKategorie } from "@/lib/witze";
import type { Witz } from "@/lib/witze";

function getTagesWitzeClient(): { morgen: Witz; abend: Witz } {
  const witze = getAlleWitze();
  const heute = new Date();
  const jahresBeginn = new Date(heute.getFullYear(), 0, 1);
  const tagDesJahres = Math.floor(
    (heute.getTime() - jahresBeginn.getTime()) / (1000 * 60 * 60 * 24)
  );
  return {
    morgen: witze[(tagDesJahres * 2) % witze.length],
    abend: witze[(tagDesJahres * 2 + 1) % witze.length],
  };
}

export default function TagesWitze() {
  const [witze, setWitze] = useState<{ morgen: Witz; abend: Witz } | null>(null);
  const [datum, setDatum] = useState("");

  useEffect(() => {
    setWitze(getTagesWitzeClient());
    setDatum(
      new Date().toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    );
  }, []);

  if (!witze) return null;

  const morgenKat = getKategorie(witze.morgen.kategorie);
  const abendKat = getKategorie(witze.abend.kategorie);

  return (
    <>
      <div>
        <p className="text-sm text-teal-600 font-medium mb-1">{datum}</p>
        <h2 className="text-2xl font-extrabold text-gray-900">Die Witze des Tages</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">☀️</span>
            <span className="text-sm font-bold text-teal-700 uppercase tracking-wide">Morgenwitz</span>
          </div>
          <WitzCard
            witz={witze.morgen}
            kategorieName={morgenKat?.name}
            kategorieEmoji={morgenKat?.emoji}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🌙</span>
            <span className="text-sm font-bold text-teal-700 uppercase tracking-wide">Abendwitz</span>
          </div>
          <WitzCard
            witz={witze.abend}
            kategorieName={abendKat?.name}
            kategorieEmoji={abendKat?.emoji}
          />
        </div>
      </div>
    </>
  );
}
