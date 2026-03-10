import Image from "next/image";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";

const PaidMediaSection = () => {
  return (
    <section className="w-full pt-[220px] ">
      <div className="z-10 text-center">
        <h2 className="font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-5xl ">
          Everything you need to
          <br />
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
      <div className=" flex justify-center items-center max-sm:flex-col ">
        {/* Left Side: Image */}
        <Image
          alt="Paid Media"
          className="rounded-[20px] w-full"
          height={400}
          src="/paid_media.png"
          width={600}
        />

        {/* Right Side: Text and Button */}
        <div className="flex flex-col justify-center gap-2">
          <div className="font-['Outfit'] font-semibold text-2xl text-purple-600 max-sm:text-xl">
            Paid Media
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="font-['Outfit'] mt-[8px] max-sm:text-2xl max-sm:leading-[23px] max-sm:mt-[1px] font-normal text-3xl text-[#111111] leading-[48px] sm:text-3xl md:text-5xl">
              Launch your campaigns with full visibility
            </p>
            <p className="font-['Outfit'] max-sm:text-[12px]  mt-[14px] max-sm:leading-[18px] max-sm:mt-[1px] font-normal text-gray-600 text-lg leading-8">
              Stop guessing what will work and start putting money on what
              will work the best for your product.
            </p>
          </div>

          {/* Button */}
          <div>
            <TalkToSalesDrawer buttonClassName="py-[24px] w-fit" buttonLabel="Talk to a Growth Expert" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaidMediaSection;
