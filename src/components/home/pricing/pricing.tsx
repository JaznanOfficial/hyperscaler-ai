"use client";

import { SectionHeader } from "@/components/shared/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PricingCards } from "./pricing-card-grid";
import { PricingComparison } from "./pricing-comparison";
import { buildPricingData, scalePricingData } from "./pricing-data";

const Pricing = () => {
  return (
    <section
      className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16"
      id="pricing"
    >
      <SectionHeader
        description="Pick the package that matches where you are. Scale to get customers. Build to ship product. No long-term contracts."
        gradientTitle="everything"
        titlePart1="Growth shouldn't cost you "
      />


      <Tabs className="w-full" defaultValue="scale">
        <TabsList className="mx-auto h-5 w-full max-w-40 cursor-pointer rounded-full border border-slate-300 bg-white text-base lg:h-12! lg:max-w-62 lg:px-2 lg:py-2">
          <TabsTrigger
            className="cursor-pointer rounded-full font-semibold text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="scale"
          >
            Scale
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer rounded-full font-semibold text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="build"
          >
            Build
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-8" value="scale">
          <PricingCards data={scalePricingData} />
        </TabsContent>
        <TabsContent className="mt-8" value="build">
          <PricingCards data={buildPricingData} />
        </TabsContent>
      </Tabs>
      {/* Import Link from "next/link" at the top of the file if not already imported */}
      <PricingComparison />
      <p className="text-center text-[16px] text-[#515A65]">
        Need both <b> Scale </b> and <b> Build </b>? Bundle them and save,{" "}
        <a
          href="https://calendly.com/ujjwalroy1/hyperscaler-scale-your-build"
          rel="noreferrer"
          target="_blank"
          className="underline text-[#9E32DD] hover:text-[#7f26b5] transition-colors"
        >
          talk to our team
        </a>{" "}
        for a custom package.
      </p>
    </section>
  );
};

export default Pricing;
