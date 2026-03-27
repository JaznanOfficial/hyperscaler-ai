import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Card } from "@/components/ui/card";
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
    desc: "Personalized Drink Recommendation",
    img: "/portfolio/portfolio-3.png",
  },
  {
    title: "College Wrapped",
    desc: "Clean Energy Project Management",
    img: "/portfolio/portfolio-4.png",
  },
  {
    title: "Eleven A",
    desc: "Smart Networking for Modern Professionals",
    img: "/portfolio/portfolio-5.png",
  },
  {
    title: "Unreal Curry ",
    desc: "Himalayan-Inspired Culinary Experience",
    img: "/portfolio/portfolio-6.png",
  },
];

const Portfolio = () => {
  return (
    <section className="">
      {/* header */}
      <div className="mb-[52px] w-full px-20 pt-[150px] max-sm:mb-5 max-sm:px-6 max-sm:pt-20">
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
          className="mx-auto mr-0 flex w-fit items-center gap-2 self-end font-semibold text-[#9E32DD] text-lg underline-offset-2 hover:underline md:text-lg"
          href="/portfolio"
        >
          View Our Portfolio <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* body */}
      <Marquee className="py-6" pauseOnHover>
        <div className="flex flex-nowrap">
          {portfolioData.map((item, index) => (
            <Card
              className={cn(
                "ml-10 flex w-[24rem] min-w-[20rem] shrink-0 flex-col gap-0 rounded-[20px] bg-white p-0 text-left shadow-md outline outline-purple-200/60 -outline-offset-1 transition-all duration-300 hover:-translate-y-2 max-sm:w-80",
                index % 2 === 1 ? "mt-16" : "mb-16"
              )}
              key={item.title}
            >
              <div className="relative h-48 w-full bg-violet-200">
                <div className="h-full w-full p-5">
                  <Image
                    alt={item.title}
                    className="h-full w-full object-cover"
                    height={200}
                    src={item.img}
                    width={409}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <h3
                  className={cn(
                    "font-['Outfit']",
                    "font-semibold text-[#0F172A] text-xl"
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-[#475467] text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Portfolio;
