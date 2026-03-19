import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const StayCreative = () => {
  return (
    <section className="w-full pt-[150px] max-w-[1480px] mx-auto max-sm:pt-20 px-20 max-sm:px-6">
      <div className="">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 ">
          {/* Left Side: Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              alt="Stay Creative"
              className="rounded-[20px] "
              height={600}
              src="/stay-creative.svg"
              width={600}
            />
            <div className="pointer-events-none absolute  bottom-16 -z-10   h-72 w-72  rounded-[999px] bg-linear-to-l from-fuchsia-500 via-violet-600 to-transparent blur-[220px] " />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center w-full h-full">
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Stay Creative
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] mt-[8px] max-sm:text-2xl max-sm:leading-[23px] max-sm:mt-px font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-5xl">
                We value branding and storytelling along with consistency in
              </p>
              <p className="font-['Outfit']  max-sm:text-xl max-sm:leading-[23px] max-sm:mt-px font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-3xl">
                social media with human touch
              </p>
              <p className="font-['Outfit'] max-sm:text-[12px] mt-[14px] max-sm:leading-[18px] max-sm:mt-px font-normal text-gray-600 text-lg leading-8">
                Automate your social media campaigns with immaculate
                storytelling that does not look like AI Slope
              </p>

            </div>

            {/* Button */}
            <TalkToSalesDrawer
              buttonClassName="mt-5 w-[230px] max-sm:w-full"
              buttonLabel="Talk to Us"
              buttonSize='lg'
              buttonVariant='gradient'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayCreative;
