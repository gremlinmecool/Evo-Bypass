import { PageShell } from "@/components/layout/page-shell";
import { HeroSection } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <PageShell children={undefined}>
      <HeroSection />
    </PageShell>
  );
}
