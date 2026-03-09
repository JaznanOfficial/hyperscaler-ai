import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const PaidMediaSection = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Side: Image */}
          <div className="relative h-full w-full">
            <Image
              src="/paid_media.png" 
              alt="Paid Media"
              width={600}
              height={400}
              className="rounded-[20px] object-cover"
            />
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[28px] font-semibold text-[#111111] md:text-[32px]">
              Paid Media
            </h3>
            <p className="mt-4 text-[16px] text-[#6B7280] md:text-[18px]">
              Launch your campaigns with full visibility
            </p>
            <p className="mt-4 text-[15px] text-[#6B7280] md:text-[16px]">
              Stop guessing what will work and start putting money on what will
              work the best for your product.
            </p>

            {/* Button */}
            <Button className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white px-6 py-3 rounded-md hover:opacity-90">
              <Phone className="h-5 w-5" />
              Talk to a Growth Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidMediaSection;