"use client";

import { useEffect, useState } from "react";
import type { Witz } from "@/lib/witze";

type Props = {
  witz: Witz;
  kategorieName?: string;
  kategorieEmoji?: string;
};

const BEWERTUNGEN = [
  { wert: 5, label: "Richtig gut", emoji: "🤣" },
  { wert: 4, label: "Gut", emoji: "😄" },
  { wert: 3, label: "Mittel", emoji: "🙂" },
  { wert: 2, label: "Schlecht", emoji: "😐" },
  { wert: 1, label: "Grottenschlecht", emoji: "😫" },
];

const STORAGE_KEY = (id: number) => `kinderwitze-rating-${id}`;

export default function WitzCard({ witz, kategorieName, kategorieEmoji }: Props) {
  const [aufgedeckt, setAufgedeckt] = useState(false);
  const [bewertung, setBewertung] = useState<number | null>(null);

  useEffect(() => {
    const gespeichert = localStorage.getItem(STORAGE_KEY(witz.id));
    if (gespeichert) setBewertung(Number(gespeichert));
  }, [witz.id]);

  function bewerteWitz(wert: number) {
    setBewertung(wert);
    localStorage.setItem(STORAGE_KEY(witz.id), String(wert));
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-teal-100 overflow-hidden">
      <div className="p-5">
        {kategorieName && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3">
            {kategorieEmoji} {kategorieName}
          </span>
        )}
        <p className="text-gray-900 text-lg leading-snug font-medium">{witz.setup}</p>
      </div>

      {!aufgedeckt ? (
        <button
          onClick={() => setAufgedeckt(true)}
          className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-bold py-4 text-base transition-colors"
        >
          Auflösung zeigen 👆
        </button>
      ) : (
        <div className="bg-teal-500 px-5 py-4 flex flex-col gap-3">
          <p className="text-white text-lg font-bold leading-snug">{witz.punchline}</p>

          {/* Bewertung */}
          <div>
            {bewertung === null ? (
              <>
                <p className="text-teal-100 text-xs mb-2 font-semibold uppercase tracking-wide">
                  Wie war der Witz?
                </p>
                <div className="flex gap-2">
                  {BEWERTUNGEN.map((b) => (
                    <button
                      key={b.wert}
                      onClick={() => bewerteWitz(b.wert)}
                      title={b.label}
                      className="flex-1 bg-white/20 hover:bg-white/40 active:bg-white/50 rounded-xl py-2 text-xl transition-colors"
                    >
                      {b.emoji}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {BEWERTUNGEN.find((b) => b.wert === bewertung)?.emoji}
                </span>
                <span className="text-teal-100 text-sm font-semibold">
                  {BEWERTUNGEN.find((b) => b.wert === bewertung)?.label}
                </span>
                <button
                  onClick={() => {
                    setBewertung(null);
                    localStorage.removeItem(STORAGE_KEY(witz.id));
                  }}
                  className="ml-auto text-teal-200 text-xs underline underline-offset-2"
                >
                  ändern
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setAufgedeckt(false)}
            className="text-teal-100 text-sm underline underline-offset-2 self-start"
          >
            Verbergen
          </button>
        </div>
      )}
    </div>
  );
}
