import BuildAndScale from "@/components/home/build-and-scale/build-and-scale";
import CallToAction from "@/components/home/call-to-action/call-to-action";
import ControlGrowth from "@/components/home/control-growth/control-growth";
import FAQ from "@/components/home/FAQ/FAQ";
import { Hero } from "@/components/home/hero/hero";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import Portfolio from "@/components/home/portfolio/portfolio";
import Testimonials from "@/components/home/testimonials/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us/why-choose-us";
import PaidMediaSection from "@/components/home/paid-media/paid-media";
import GenerateLeadsSection from "@/components/home/generate-leads/generate-leads";
import StayCreative from "@/components/home/stay-creative/stay-creative";
import BuildWithUsSection from "@/components/home/build-with-us/build-with-us";
import Hero02 from "@/components/home/hero/hero-0.2";

export default function Page() {
  return (
    <>
      <Hero02 />
      {/* <HowItWorks /> */}
      {/* <BuildAndScale /> */}
      {/* <ControlGrowth /> */}
      <PaidMediaSection />
      <GenerateLeadsSection />
      <StayCreative />
      <BuildWithUsSection />
      <WhyChooseUs />
      <Testimonials />
      <Portfolio />
      <CallToAction />
    </>
  );
}
