import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EverythingYouNeed = () => {
  const cards = [
    {
      id: "marketing-tools",
      title: "Connect 30+ marketing tools through one platform",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <video
            autoPlay
            className="h-full w-full object-contain"
            controls={false}
            loop
            muted
            playsInline
            src="/everyting-you-need/video-1.mp4"
          />
        </div>
      ),
    },
    {
      id: "ai-efficiency",
      title: "Get the ideal blend of AI efficiency and human expertise",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <video
            autoPlay
            className="h-full w-full object-contain"
            controls={false}
            loop
            muted
            playsInline
            src="/everyting-you-need/video-2.mp4"
          />
        </div>
      ),
    },
    {
      id: "growth-metrics",
      title: "We scale your growth and build your product.",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <video
            autoPlay
            className="h-full w-full object-contain"
            controls={false}
            loop
            muted
            playsInline
            src="/everyting-you-need/video-3.mp4"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="mx-auto mb-20 max-w-6xl text-center">
        <h2 className="font-semibold text-[#1f1f1f] text-[32px] leading-[1.08] tracking-[-0.03em] md:text-[32px]">
          Everything your business needs to grow
        </h2>

        <p className="mx-auto mt-[10px] text-[#6b7280] text-[16px] leading-[1.45] max-sm:text-[16px] md:text-lg">
          Hyperscaler brings your entire growth engine, marketing stack, AI
          insights, and product development all into one place that actually
          makes sense.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            className="flex h-88 flex-col gap-10 rounded-xl border border-neutral-300/50 bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.02),0px_2px_4px_rgba(0,0,0,0.04)] md:h-96 lg:h-88"
            key={card.id}
          >
            <h3 className="font-['Outfit'] font-medium text-[#1F1F1F] text-xl">
              {card.title}
            </h3>
            {card.content}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild className="px-6! py-5!" size="lg" variant="gradient">
          <Link href="/signup">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default EverythingYouNeed;
