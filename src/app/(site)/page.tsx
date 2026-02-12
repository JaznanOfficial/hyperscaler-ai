import BuildAndScale from "@/components/home/build-and-scale/build-and-scale";
import CallToAction from "@/components/home/call-to-action/call-to-action";
import ControlGrowth from "@/components/home/control-growth/control-growth";
import FAQ from "@/components/home/FAQ/FAQ";
import { Hero } from "@/components/home/hero/hero";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import Portfolio from "@/components/home/portfolio/portfolio";
import Pricing from "@/components/home/pricing/pricing";
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
      <ControlGrowth />
      <Portfolio />
      <Pricing />
      <FAQ />
      <CallToAction />
    </>
  );
}
