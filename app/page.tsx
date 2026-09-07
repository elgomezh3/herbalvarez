import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Marquee } from "@/components/marquee";
import { Products } from "@/components/products";
import { Difference } from "@/components/difference";
import { Athletes } from "@/components/athletes";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Marquee />
      <Products />
      <Difference />
      <Athletes />
    </>
  );
}
