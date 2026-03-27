import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const PaidMediaSection = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="z-10 text-center">
        <h2 className="font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-5xl">
          Everything you need to
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            Build{" "}
          </span>
          and{" "}
          <span className="bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            Scale{" "}
          </span>
          — in one platform
        </h2>

        <p className="mt-2 font-normal text-[#515A65] text-sm leading-[1.4] tracking-[0] sm:text-lg">
          From idea to growth, we&apos;ve got every stage covered with
          AI-powered execution
        </p>
      </div>

      <div className="mt-20 flex items-center justify-center gap-10 max-sm:flex-col">
        {/* Left Side: Image */}
        <FadeInUp delay={0.2}>
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              alt="Stay Creative"
              // className="rounded-4xl"
              height={600}
              src="/paid-media-left.svg"
              width={600}
            />
            <div className="pointer-events-none absolute bottom-16 -z-10 h-72 w-72 rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px]" />
          </div>
        </FadeInUp>

        {/* Right Side: Text and Button */}
        <div className="flex h-full w-full flex-col justify-center gap-3">
          <FadeInUp delay={0.2}>
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Paid Media
            </div>
          </FadeInUp>
          <div className="flex flex-col gap-3.5">
            <FadeInUp delay={0.3}>
              <p className="mt-[8px] font-['Outfit'] font-normal text-3xl text-[#111111] leading-[48px] max-sm:mt-[1px] max-sm:text-2xl max-sm:leading-[23px] sm:text-3xl md:text-5xl">
                Launch your campaigns with full visibility
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <p className="mt-[14px] font-['Outfit'] font-normal text-gray-600 text-lg leading-8 max-sm:mt-[1px] max-sm:text-[12px] max-sm:leading-[18px]">
                Stop guessing what will work and start putting money on what
                will work the best for your product.
              </p>
            </FadeInUp>
          </div>

          {/* Button */}
          <FadeInUp delay={0.5}>
            <div>
              <TalkToSalesDrawer
                buttonClassName="py-[24px] w-fit px-6! py-5!"
                buttonLabel="Talk to a Growth Expert"
                buttonVariant="gradient"
              />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default PaidMediaSection;
