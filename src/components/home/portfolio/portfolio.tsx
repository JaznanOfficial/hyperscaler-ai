import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

const portfolioData = [
  {
    title: "Ovanova",
    desc: "Clean Energy Project Management",
    img: "/portfolio/portfolio-1.png",
  },
  {
    title: "Unreal AI",
    desc: "Autonomous AI Agents for Business Growth",
    img: "/portfolio/portfolio-2.png",
  },
  {
    title: "The Order AI",
    desc: "Personalized Drink Recommendation Platform",
    img: "/portfolio/portfolio-3.png",
  },
  {
    title: "College Wrapped",
    desc: "Clean Energy Project Management",
    img: "/portfolio/portfolio-3.png",
  },
];

const Portfolio = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:gap-13 lg:py-16">
      {/* header */}
      <div className="mx-auto mb-10 flex w-11/12 flex-col justify-between gap-4 sm:flex-row sm:items-end lg:w-10/12">
        <div className="">
          <h3
            className={cn(
              "font-['Outfit']",
              "font-medium text-2xl md:text-5xl"
            )}
          >
            Our Portfolio
          </h3>
          <p className="text-[#515A65] text-lg md:text-2xl">
            Explore projects we&apos;ve designed and built for our clients
          </p>
        </div>
        <Link
          className="flex items-center gap-2 font-semibold text-[#9E32DD] text-lg underline-offset-2 hover:underline md:text-2xl"
          href="/portfolio"
        >
          View Our Portfolio <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* body */}
      <Marquee pauseOnHover>
        <div className="flex flex-nowrap">
          {portfolioData.map((item, index) => (
            <div
              className={cn("ml-10 text-left", index % 2 === 1 && "mt-[90px]")}
              key={index}
            >
              <div className="overflow-hidden rounded-2xl shadow-md">
                <Image
                  alt={item.title}
                  className="h-auto w-full object-cover max-sm:w-80"
                  height={200}
                  src={item.img}
                  width={409}
                />
              </div>
              <h3
                className={cn(
                  "font-['Outfit']",
                  "mt-3 font-semibold text-[#1A1A1A] text-lg md:text-2xl"
                )}
              >
                {item.title}
              </h3>
              <p className="mt-1 text-[#515A65] text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Portfolio;
