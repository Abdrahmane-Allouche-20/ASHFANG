import HomeHero from "@/components/home/HomeHero";
import Frameworks from "@/components/sections/Frameworks";
import Products from "@/components/products/Products";
import ServicesOverview from "@/components/home/ServicesOverview";
import Principles from "@/components/home/Principles";
import Approach from "@/components/sections/Approach";
import CTABand from "@/components/layout/CTABand";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Frameworks />
      <ServicesOverview />
      <Products />
      <Principles />
      <Approach />
      <CTABand />
    </>
  );
}
