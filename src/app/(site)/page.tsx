import BuildAndScale from "@/components/home/build-and-scale/build-and-scale";
import { Hero } from "@/components/home/hero/hero";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import Testimonials from "@/components/home/testimonials/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us/why-choose-us";

export default function Page() {
  return (
    <>
      <Hero />
      <Testimonials />
      <HowItWorks />
      <WhyChooseUs />
      <BuildAndScale />
    </>
  );
}
