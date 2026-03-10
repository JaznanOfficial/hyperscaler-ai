import { CodeXml } from "lucide-react";
import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const BuildWithUsSection = () => {
  return (
    <section className="relative w-full overflow- py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-1/2 right-4 z-0 h-72 w-72 -translate-y-1/2 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px] md:top-2/5 md:right-0 md:h-70 md:w-70" />

      <div className="">
        <div className="  flex justify-center items-center  max-sm:flex-col-reverse">
          {/* Left Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Build with us
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] mt-[8px] max-sm:text-2xl max-sm:leading-[23px] max-sm:mt-px font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-5xl">
                Launch, develop or automate
              </p>
              <p className="font-['Outfit'] max-sm:text-[12px] mt-[14px] max-sm:leading-[18px] max-sm:mt-px font-normal text-gray-600 text-lg leading-8">
                Eliminate manual work, build clear milestones and Bring your
                product idea to life with a structured roadmap.
              </p>
            </div>

            {/* Button */}
            <TalkToSalesDrawer
              buttonLabel="Book a free growth session"
              trigger={
                <Button className="mt-5 w-fit" size="lg" variant={"gradient"}>
                  <CodeXml className="size-4" />
                  Talk to our developers
                </Button>
              }
            />
          </div>

          {/* Right Side: Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Build With Us"
              className="w-full rounded-[20px] object-fill"
              height={400}
              src="/build_withus.png"
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildWithUsSection;
