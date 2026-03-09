import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const StayCreative = () => {
  return (
    <section className="w-full py-16">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <div className="relative h-full w-full">
            <Image
              alt="Stay Creative"
              className="rounded-[20px] object-cover"
              height={400}
              src="/stay_creative.png"
              width={600}
            />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <div className="font-['Outfit'] font-semibold text-purple-600 text-xl">
              Stay Creative
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="font-['Outfit'] font-medium text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-4xl">
                We value branding and storytelling along with consistency in
                social media with human touch
              </p>
              <p className="font-['Outfit'] font-normal text-gray-600 text-xl leading-8">
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
