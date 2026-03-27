import BuildWithUsSection from "@/components/home/build-with-us/build-with-us";
import CallToAction from "@/components/home/call-to-action/call-to-action";
import EverythingYouNeed from "@/components/home/everything-you-need/everything-you-need";
import GenerateLeadsSection from "@/components/home/generate-leads/generate-leads";
import Hero02 from "@/components/home/hero/hero-0.2";
import HowHyperscalerWorks from "@/components/home/how-hyperscaler-works/how-hyperscaler-works";
import MarketingTools from "@/components/home/marketing-tools/marketing-tools";
import PaidMediaSection from "@/components/home/paid-media/paid-media";
import Portfolio from "@/components/home/portfolio/portfolio";
import StayCreative from "@/components/home/stay-creative/stay-creative";
import Testimonials from "@/components/home/testimonials/testimonials";

export default function Page() {
  return (
    <div>
      <div className="">
        <Hero02 />
        {/* <HowItWorks /> */}
        {/* <BuildAndScale /> */}
        {/* <ControlGrowth /> */}
        <PaidMediaSection />
        <GenerateLeadsSection />
        <StayCreative />
        <BuildWithUsSection />
        <MarketingTools />
        <EverythingYouNeed />
        <HowHyperscalerWorks />
        <Testimonials />
        <Portfolio />
      </div>
      <CallToAction />
    </div>
  );
}
