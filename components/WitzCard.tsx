"use client";

import { useState } from "react";
import type { Witz } from "@/lib/witze";

type Props = {
  witz: Witz;
  kategorieName?: string;
  kategorieEmoji?: string;
};

export default function WitzCard({ witz, kategorieName, kategorieEmoji }: Props) {
  const [aufgedeckt, setAufgedeckt] = useState(false);

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
        <div className="bg-teal-500 px-5 py-4">
          <p className="text-white text-lg font-bold leading-snug">{witz.punchline}</p>
          <button
            onClick={() => setAufgedeckt(false)}
            className="mt-3 text-teal-100 text-sm underline underline-offset-2"
          >
            Verbergen
          </button>
        </div>
      )}
    </div>
  );
}
