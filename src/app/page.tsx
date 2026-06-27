import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import WhyCyngard from "@/components/sections/WhyCyngard";
import Approach from "@/components/sections/Approach";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WhyCyngard />
        <Approach />
        <Stats />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
