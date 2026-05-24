import daten from "@/data/witze.json";

export type Witz = {
  id: number;
  kategorie: string;
  setup: string;
  punchline: string;
};

export type Kategorie = {
  id: string;
  name: string;
  emoji: string;
};

export function getKategorien(): Kategorie[] {
  return daten.kategorien;
}

export function getKategorie(id: string): Kategorie | undefined {
  return daten.kategorien.find((k) => k.id === id);
}

export function getAlleWitze(): Witz[] {
  return daten.witze as Witz[];
}

export function getWitzeByKategorie(kategorieId: string): Witz[] {
  return (daten.witze as Witz[]).filter((w) => w.kategorie === kategorieId);
}

export function getTagesWitze(): { morgen: Witz; abend: Witz } {
  const witze = daten.witze as Witz[];
  const heute = new Date();
  const jahresBeginn = new Date(heute.getFullYear(), 0, 1);
  const tagDesJahres = Math.floor(
    (heute.getTime() - jahresBeginn.getTime()) / (1000 * 60 * 60 * 24)
  );
  const morgenIndex = (tagDesJahres * 2) % witze.length;
  const abendIndex = (tagDesJahres * 2 + 1) % witze.length;
  return {
    morgen: witze[morgenIndex],
    abend: witze[abendIndex],
  };
}
