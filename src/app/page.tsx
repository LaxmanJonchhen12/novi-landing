import { BoardPreview } from "@/components/sections/board-preview";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <BoardPreview />
      <Features />
    </main>
  );
}
