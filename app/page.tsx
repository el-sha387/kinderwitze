import KategorienNav from "@/components/KategorienNav";
import TagesWitze from "@/components/TagesWitze";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <KategorienNav />
      <TagesWitze />
    </div>
  );
}
