import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Renovation } from "@/components/sections/renovation";
import { SmartInfrastructureVisual } from "@/components/sections/smart-infrastructure-visual";
import { WhySmart } from "@/components/sections/why-smart";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/sections/footer";
import { Cursor } from "@/components/ui/cursor";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <ServicesGrid />
        <Renovation />
        <SmartInfrastructureVisual />
        <WhySmart />
        <Process />
        <ContactCTA />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
