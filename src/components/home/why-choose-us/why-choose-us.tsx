import { ArrowRight, Hourglass, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const comparisonData = {
  traditional: [
    "Slow processes",
    "Expensive retainers",
    "Manual coordination",
    "Tool complexity",
    "Poor support",
  ],
  hyperscaler: [
    "Instant execution",
    "Transparent pricing",
    "Automated workflows",
    "AI + human expertise",
    "Real-time insights",
  ],
};

const WhyChooseUs = () => {
  return (
    <section className="mx-auto w-full py-[72px] md:py-[84px]">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="max-w-6xl text-center">
          <h2 className="font-semibold text-2xl text-[#1f1f1f] leading-[1.08] tracking-[-0.03em] md:text-5xl">
            Built{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
              different
            </span>{" "}
            from anything you&apos;ve tried
          </h2>

          <p className="mx-auto mt-[10px] max-w-[790px] text-[#6b7280] text-lg leading-[1.45] md:text-xl">
            Agencies move slow and charge a fortune. SaaS tools hand you a
            dashboard and wish you luck. Hyperscaler actually does the work with
            AI speed and human judgment.
          </p>
        </div>

        <div className="relative mt-[34px] flex w-full max-w-2xl items-center justify-center">
          <div className="flex h-[40px] w-full items-center justify-between rounded-full bg-[#ececec] px-[18px] font-semibold text-[#171717] text-lg">
            <div className="flex items-center gap-[8px]">
              <Hourglass className="h-[14px] w-[14px] stroke-[2.2]" />
              <span>Traditional way</span>
            </div>

            <div className="flex items-center gap-[8px] pr-[2px]">
              <Sparkles className="h-[14px] w-[14px] stroke-[2.2]" />
              <span>Hyperscaler AI</span>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 z-20 flex h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-[#fff] font-semibold text-[#111111] text-lg shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
            VS
          </div>
        </div>

        <div className="relative mt-[40px] w-full max-w-[642px]">
          <div className="absolute top-[-38px] left-1/2 hidden h-[280px] w-px -translate-x-1/2 bg-[#dadada] lg:block" />

          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-[64px]">
            <div className="relative min-h-[242px] overflow-hidden rounded-[16px] px-[20px] py-[22px]">
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(ellipse_at_right,rgba(0,0,0,0.055),rgba(0,0,0,0.02)_34%,rgba(0,0,0,0)_72%)]" />

              <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-[linear-gradient(to_right,rgba(205,205,205,0)_0%,rgba(205,205,205,0.95)_12%,rgba(205,205,205,0.95)_82%,rgba(205,205,205,0)_100%)]" />

              <div className="pointer-events-none absolute top-0 right-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(205,205,205,0.95)_0%,rgba(205,205,205,0.95)_78%,rgba(205,205,205,0)_100%)]" />

              <div className="pointer-events-none absolute top-0 right-0 h-[16px] w-[16px] rounded-tr-[16px] border-[#cdcdcd] border-t border-r" />

              <div className="relative z-10 pt-[8px]">
                <h3 className="font-semibold text-[#1b1b1b] text-xl tracking-[-0.02em]">
                  Traditional Agencies
                </h3>

                <ul className="mt-[24px] space-y-[14px]">
                  {comparisonData.traditional.map((item) => (
                    <li className="flex items-center gap-[11px]" key={item}>
                      <span className="h-[10px] w-[10px] rounded-full bg-[#e8cccc]" />
                      <span className="text-[#5c6169] text-lg leading-[1.25]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative min-h-[242px] overflow-hidden rounded-[16px] px-[20px] py-[22px]">
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(ellipse_at_left,rgba(168,85,247,0.14),rgba(168,85,247,0.06)_32%,rgba(168,85,247,0)_70%)]" />

              <div className="pointer-events-none absolute top-0 left-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(215,183,255,0.96)_0%,rgba(215,183,255,0.96)_78%,rgba(215,183,255,0)_100%)]" />

              <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-[linear-gradient(to_right,rgba(215,183,255,0)_0%,rgba(215,183,255,0.96)_14%,rgba(215,183,255,0.96)_84%,rgba(215,183,255,0)_100%)]" />

              <div className="pointer-events-none absolute top-0 left-0 h-[16px] w-[16px] rounded-tl-[16px] border-[#d7b7ff] border-t border-l" />

              <div className="relative z-10 pt-[8px]">
                <h3 className="font-semibold text-purple-600 text-xl tracking-[-0.02em]">
                  Hyperscaler
                </h3>

                <ul className="mt-[24px] space-y-[14px]">
                  {comparisonData.hyperscaler.map((item) => (
                    <li className="flex items-center gap-[11px]" key={item}>
                      <span className="h-[10px] w-[10px] rounded-full bg-[#2dbd5a]" />
                      <span className="text-[#5c6169] text-lg leading-[1.25]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="https://calendly.com/ujjwalroy1/ai-implementation"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Button className="mt-5" size="lg" variant={"gradient"}>
            Book a free session
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default WhyChooseUs;
