import KategorienNav from "@/components/KategorienNav";
import WitzCard from "@/components/WitzCard";
import { getKategorie, getTagesWitze } from "@/lib/witze";

export default function HomePage() {
  const { morgen, abend } = getTagesWitze();
  const heute = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const morgenKat = getKategorie(morgen.kategorie);
  const abendKat = getKategorie(abend.kategorie);

  return (
    <div className="flex flex-col gap-6">
      <KategorienNav />

      <div>
        <p className="text-sm text-teal-600 font-medium mb-1">{heute}</p>
        <h2 className="text-2xl font-extrabold text-gray-900">Die Witze des Tages</h2>
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">☀️</span>
            <span className="text-sm font-bold text-teal-700 uppercase tracking-wide">Morgenwitz</span>
          </div>
          <WitzCard
            witz={morgen}
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
            witz={abend}
            kategorieName={abendKat?.name}
            kategorieEmoji={abendKat?.emoji}
          />
        </div>
      </section>
    </div>
  );
}
