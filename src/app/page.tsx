import { BoardPreview } from "@/components/sections/board-preview";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <BoardPreview />
      <Features />
      <HowItWorks />
      <Pricing />
    </main>
  );
}
