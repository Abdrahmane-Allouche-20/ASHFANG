import HomeHero from "@/components/home/HomeHero";
import Frameworks from "@/components/sections/Frameworks";
import Products from "@/components/products/Products";
import ServicesOverview from "@/components/home/ServicesOverview";
import Principles from "@/components/home/Principles";
import Approach from "@/components/sections/Approach";
import CTABand from "@/components/layout/CTABand";
import FAQ from "@/components/sections/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Frameworks />
      <ServicesOverview />
      <Products />
      <Principles />
      <Approach />
      <FAQ />
      <JsonLd data={faqSchema()} />
      <CTABand />
    </>
  );
}
