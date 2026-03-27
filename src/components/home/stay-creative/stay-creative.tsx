import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const StayCreative = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <FadeInUp delay={0.2}>
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                alt="Stay Creative"
                className="rounded-[20px]"
                height={600}
                src="/stay-creative.svg"
                width={600}
              />
              <div className="pointer-events-none absolute bottom-16 -z-10 h-72 w-72 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px]" />
            </div>
          </FadeInUp>

          {/* Right Side: Text and Button */}
          <div className="flex h-full w-full flex-col justify-center gap-3">
            <FadeInUp delay={0}>
              <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
                Stay Creative
              </div>
            </FadeInUp>
            <div className="flex flex-col gap-3">
              <FadeInUp delay={0.1}>
                <p className="mt-[8px] font-['Outfit'] font-normal text-3xl text-[#111111] leading-[48px] max-sm:mt-px max-sm:text-2xl max-sm:leading-[23px] sm:text-3xl md:text-5xl">
                  We value branding and storytelling along with consistency in
                </p>
              </FadeInUp>
              <FadeInUp delay={0.15}>
                <p className="font-['Outfit'] font-normal text-3xl text-[#111111] leading-[48px] max-sm:mt-px max-sm:text-xl max-sm:leading-[23px] sm:text-3xl md:text-3xl">
                  social media with human touch
                </p>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="mt-[14px] font-['Outfit'] font-normal text-gray-600 text-lg leading-8 max-sm:mt-px max-sm:text-[12px] max-sm:leading-[18px]">
                  Automate your social media campaigns with immaculate
                  storytelling that does not look like AI Slope
                </p>
              </FadeInUp>
            </div>

            {/* Button */}
            <FadeInUp delay={0.3}>
              <div>
                <TalkToSalesDrawer
                  buttonClassName=" w-[230px]"
                  buttonLabel="Talk to Us"
                  buttonSize="lg"
                  buttonVariant="gradient"
                />
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayCreative;
