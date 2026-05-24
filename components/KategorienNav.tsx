import Link from "next/link";
import { getKategorien } from "@/lib/witze";

type Props = {
  aktiv?: string;
};

export default function KategorienNav({ aktiv }: Props) {
  const kategorien = getKategorien();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <Link
        href="/"
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          aktiv === undefined
            ? "bg-teal-500 text-white"
            : "bg-teal-50 text-teal-700 hover:bg-teal-100"
        }`}
      >
        ☀️ Tageswitz
      </Link>
      {kategorien.map((k) => (
        <Link
          key={k.id}
          href={`/kategorien/${k.id}`}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            aktiv === k.id
              ? "bg-teal-500 text-white"
              : "bg-teal-50 text-teal-700 hover:bg-teal-100"
          }`}
        >
          {k.emoji} {k.name}
        </Link>
      ))}
    </nav>
  );
}
