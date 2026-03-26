import { CodeXml } from "lucide-react";
import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const BuildWithUsSection = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="">
        <div className="flex items-center justify-center max-sm:flex-col-reverse">
          {/* Left Side: Text and Button */}
          <div className="flex h-full w-full flex-col justify-center">
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Build with us
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="mt-[8px] font-['Outfit'] font-normal text-3xl text-[#111111] leading-[48px] max-sm:mt-px max-sm:text-2xl max-sm:leading-[23px] sm:text-3xl md:text-5xl">
                Launch, develop or automate
              </p>
              <p className="mt-[14px] font-['Outfit'] font-normal text-gray-600 text-lg leading-8 max-sm:mt-px max-sm:text-[12px] max-sm:leading-[18px]">
                Eliminate manual work, build clear milestones and Bring your
                product idea to life with a structured roadmap.
              </p>
            </div>

            {/* Button */}
            <TalkToSalesDrawer
              buttonLabel="Book a free growth session"
              trigger={
                <Button
                  className="mt-5 w-fit px-6! py-5!"
                  size="lg"
                  variant={"gradient"}
                >
                  <CodeXml className="size-4" />
                  Talk to our developers
                </Button>
              }
            />
          </div>

          {/* Right Side: Image */}
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              alt="Build With Us"
              className="rounded-[20px]"
              height={600}
              src="/build-with-us.svg"
              width={600}
            />
            <div className="pointer-events-none absolute bottom-16 -z-10 h-72 w-72 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildWithUsSection;
