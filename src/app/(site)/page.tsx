import { Hero } from "@/components/home/hero/hero";
import HowItWorks from "@/components/home/how-it-works/how-it-works";
import Testimonials from "@/components/home/testimonials/testimonials";

export default function Page() {
  return (
    <>
      <Hero />
      <Testimonials />
      <HowItWorks />
    </>
  );
}
