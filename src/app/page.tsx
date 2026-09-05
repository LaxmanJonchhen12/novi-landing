import { BoardPreview } from "@/components/sections/board-preview";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <BoardPreview />
    </main>
  );
}
