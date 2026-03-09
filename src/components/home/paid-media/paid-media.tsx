import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const PaidMediaSection = () => {
  return (
    <section className="w-full py-16">
      <div className="z-10 text-center">
        <h2 className="font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-[32px]">
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

        <p className="mt-2 font-normal text-[#515A65] text-sm leading-[1.4] tracking-[0] sm:text-base">
          From idea to growth, we&apos;ve got every stage covered with
          AI-powered execution
        </p>
      </div>
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Paid Media"
              className="rounded-[20px] object-cover"
              height={400}
              src="/paid_media.png"
              width={600}
            />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center gap-2">
            <div className="font-['Outfit'] font-semibold text-purple-600 text-xl">
              Paid Media
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] font-medium text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-4xl">
                Launch your campaigns with full visibility
              </p>
              <p className="font-['Outfit'] font-normal text-gray-600 text-xl leading-8">
                Stop guessing what will work and start putting money on what
                will work the best for your product.
              </p>
            </div>

            {/* Button */}
            <TalkToSalesDrawer buttonLabel="Talk to a Growth Expert" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidMediaSection;
