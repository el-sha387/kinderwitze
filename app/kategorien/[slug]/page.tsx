import { notFound } from "next/navigation";
import KategorienNav from "@/components/KategorienNav";
import WitzCard from "@/components/WitzCard";
import { getKategorie, getKategorien, getWitzeByKategorie } from "@/lib/witze";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getKategorien().map((k) => ({ slug: k.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const kat = getKategorie(slug);
  return { title: kat ? `${kat.emoji} ${kat.name} – Witze für Kinder` : "Kategorie" };
}

export default async function KategoriePage({ params }: Props) {
  const { slug } = await params;
  const kategorie = getKategorie(slug);
  if (!kategorie) notFound();

  const witze = getWitzeByKategorie(slug);

  return (
    <div className="flex flex-col gap-6">
      <KategorienNav aktiv={slug} />

      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">
          {kategorie.emoji} {kategorie.name}
        </h2>
        <p className="text-sm text-teal-600 mt-1">{witze.length} Witze</p>
      </div>

      <div className="flex flex-col gap-4">
        {witze.map((witz) => (
          <WitzCard key={witz.id} witz={witz} />
        ))}
      </div>
    </div>
  );
}
