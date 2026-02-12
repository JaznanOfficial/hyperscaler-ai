import { Play } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonialsData = [
  {
    avatar: "/testimonials/avatar-1.png",
    name: "Parfait",
    role: "Founder/Chief Executive Officer, Credentials",
    comment:
      "I lacked the technical expertise to build our product. the ScaleBuild team quickly understood our fintech vision, created a roadmap, and provided daily updates. The process was seamless.",
  },
  {
    avatar: "/testimonials/avatar-2.png",
    name: "John Carey",
    role: "Chief Executive Officer, Ovanova",
    comment:
      "I had the pleasure of working with the ScaleBuild team. Their technical expertise, seamless collaboration, and outstanding results made the process a breeze. Highly recommended!",
  },
  {
    avatar: "/testimonials/avatar-3.png",
    name: "Steve Dickerman",
    role: "Founder/Chief Executive Officer, Sangria",
    comment:
      "We had a vision but not a complete product. The ScaleBuild team took our UI/UX designs, executed them, and helped us build a beautiful and continuous product. Their communication is incredible and they always deliver quality work.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative mx-auto my-container flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
      {/* section header */}
      <SectionHeader
        description="Trusted by founders"
        titlePart1="Testimonials"
      />
      {/* body */}
      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((item, index) => (
          <div
            className="flex flex-col justify-between rounded-lg border border-purple-200 bg-neutral-100 p-3 md:p-6"
            key={index}
          >
            <div>
              <div className="flex items-start gap-4">
                <Image
                  alt={item.name}
                  className="rounded-full object-cover"
                  height={56}
                  src={item.avatar}
                  width={56}
                />
                <div className="flex-1">
                  <h3
                    className={cn(
                      "font-['Outfit']",
                      "font-semibold text-[#1A1A1A] text-[18px]"
                    )}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[#414851] text-sm">{item.role}</p>
                </div>
              </div>
              <p className="mt-4 font-medium text-[#414851] text-base">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            <Button className="mt-4 w-fit" size={"sm"} variant={"gradient"}>
              <Play className="size-3" /> Watch Video
            </Button>
          </div>
        ))}
      </div>

      {/* designs */}
      <div className="absolute bottom-0 left-1/2 aspect-square size-[308px] -translate-x-1/2 rounded-full bg-linear-to-r from-[#5B21B6] to-[#D946EF] opacity-20 blur-[170px] md:opacity-40 lg:opacity-70" />
    </section>
  );
};

export default Testimonials;
