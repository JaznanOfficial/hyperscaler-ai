import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const StayCreative = () => {
  return (
    <section className="w-full py-16">
      <div className="">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Stay Creative"
              className="rounded-[20px] object-cover"
              height={600}
              src="/stay_creative.png"
              width={800}
            />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
              Stay Creative
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] mt-[8px] max-sm:text-2xl max-sm:leading-[23px] max-sm:mt-px font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-5xl">
                We value branding and storytelling along with consistency in
                social media with human touch
              </p>
              <p className="font-['Outfit'] max-sm:text-[12px] mt-[14px] max-sm:leading-[18px] max-sm:mt-px font-normal text-gray-600 text-lg leading-8">
                Automate your social media campaigns with immaculate
                storytelling that does not look like AI Slope
              </p>
            </div>

            {/* Button */}
            <TalkToSalesDrawer
              buttonClassName="mt-5 w-fit"
              buttonLabel="Talk to us"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayCreative;
