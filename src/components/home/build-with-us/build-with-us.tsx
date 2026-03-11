import { CodeXml } from "lucide-react";
import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";

const BuildWithUsSection = () => {
  return (
    <section className="w-full mt-20 px-20 max-sm:px-6">

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
          <div className="relative ">
            <Image
              alt="Build With Us"
              className=" rounded-[20px] "
              height={600}
              src="/build-with-us.svg"
              width={600}
            />
            <div className="pointer-events-none absolute  bottom-16 -z-10   h-72 w-72  rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px] " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildWithUsSection;
