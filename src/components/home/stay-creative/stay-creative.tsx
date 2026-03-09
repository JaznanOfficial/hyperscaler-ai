import Image from "next/image";
import { Button } from "@/components/ui/button";

const StayCreative = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <div className="relative h-full w-full">
            <Image
              src="/stay_creative.png" 
              alt="Stay Creative"
              width={600}
              height={400}
              className="rounded-[20px] object-cover"
            />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[28px] font-semibold text-[#111111] md:text-[32px]">
              Stay Creative
            </h3>
            <p className="mt-4 text-[16px] text-[#6B7280] md:text-[18px]">
              We value branding and storytelling along with consistency in social media with
              human touch
            </p>
            <p className="mt-4 text-[15px] text-[#6B7280] md:text-[16px]">
              Automate your social media campaigns with immaculate storytelling that does not
              look like AI Slope.
            </p>

         
            {/* Button */}
            <Button className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white px-6 py-3 rounded-md hover:opacity-90">
              Talk to Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayCreative;