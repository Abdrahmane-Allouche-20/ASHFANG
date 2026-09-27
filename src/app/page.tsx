import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Frameworks from "@/components/sections/Frameworks";
import Products from "@/components/products/Products";
import Services from "@/components/sections/Services";
import Manifesto from "@/components/sections/Manifesto";
import WhyCyngard from "@/components/sections/WhyCyngard";
import Approach from "@/components/sections/Approach";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Frameworks />
        <Products />
        <Services />
        <Manifesto />
        <WhyCyngard />
        <Approach />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
