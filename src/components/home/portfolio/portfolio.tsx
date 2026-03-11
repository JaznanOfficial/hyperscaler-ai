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
    <section className="">
      {/* header */}
      <div className="w-full my-10  px-20 max-sm:px-6">
        <div className="">
          <div className="">
            <h3
              className={cn(
                "font-['Outfit']",
                "font-medium text-2xl leading-[1.4] sm:text-[28px] md:text-5xl"
              )}
            >
              Our Portfolio
            </h3>
            <p className="mt-2 font-normal text-[#515A65] text-sm leading-[1.4] sm:text-lg md:text-xl">
              Explore projects we&apos;ve designed and built for our clients
            </p>
          </div>

        </div>
        <Link
          className="flex  w-fit self-end mx-auto mr-0 items-center gap-2 font-semibold text-[#9E32DD] text-lg underline-offset-2 hover:underline md:text-lg"
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
