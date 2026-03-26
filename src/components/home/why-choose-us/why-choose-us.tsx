import { ArrowRight } from "lucide-react";
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
    <section className="mx-auto w-full px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="max-w-6xl text-center">
          <h2 className="font-semibold text-[#1f1f1f] text-[32px] leading-[1.08] tracking-[-0.03em] md:text-[32px]">
            Built{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
              different
            </span>{" "}
            from anything you&apos;ve tried
          </h2>

          <p className="mx-auto mt-[10px] max-w-[790px] text-[#6b7280] text-[16px] leading-[1.45] max-sm:w-screen max-sm:text-[16px] md:text-lg">
            Agencies move slow and charge a fortune. SaaS tools hand you a
            dashboard and wish you luck. Hyperscaler actually does the work with
            AI speed and human judgment.
          </p>
        </div>

        <div className="relative mt-[34px] flex w-full max-w-2xl items-center justify-center">
          <div className="flex w-full max-w-[520px] flex-col gap-3 sm:flex-row sm:gap-6">
            <div className="flex h-[40px] w-full items-center gap-[8px] rounded-full bg-gradient-to-r from-[#D1D1D173] to-[#D1D1D11F] px-[18px] font-semibold text-[#171717] text-base sm:w-[250px] sm:rounded-r-none sm:rounded-l-full sm:text-lg">
              <svg
                fill="none"
                height="18"
                viewBox="0 0 18 18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1353_12460)">
                  <path
                    d="M3.75 16.5H14.25"
                    stroke="#161515"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    d="M3.75 1.5H14.25"
                    stroke="#161515"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    d="M12.75 16.5V13.371C12.7499 12.9732 12.5918 12.5917 12.3105 12.3105L9 9L5.6895 12.3105C5.40818 12.5917 5.25008 12.9732 5.25 13.371V16.5"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    d="M5.25 1.5V4.629C5.25008 5.02679 5.40818 5.40826 5.6895 5.6895L9 9L12.3105 5.6895C12.5918 5.40826 12.7499 5.02679 12.75 4.629V1.5"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1353_12460">
                    <rect fill="white" height="18" width="18" />
                  </clipPath>
                </defs>
              </svg>

              <span>Traditional way</span>
            </div>

            <div className="flex h-[40px] w-full items-center justify-start gap-[8px] rounded-full bg-gradient-to-r from-[#D1D1D11F] to-[#D1D1D173] px-[18px] font-semibold text-[#171717] text-base max-sm:mt-6 max-sm:justify-end sm:w-[250px] sm:justify-end sm:rounded-r-full sm:rounded-l-none sm:text-lg">
              <svg
                fill="none"
                height="22"
                viewBox="0 0 22 22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.87 13.6244L12.0578 16.4651C11.7535 17.5285 10.2465 17.5285 9.94214 16.4651L9.13089 13.6244C9.07952 13.4447 8.98322 13.281 8.85106 13.1489C8.7189 13.0167 8.55525 12.9204 8.37555 12.8691L5.5348 12.0578C4.47147 11.7535 4.47147 10.2465 5.5348 9.94214L8.37555 9.13089C8.55525 9.07952 8.7189 8.98322 8.85106 8.85106C8.98322 8.7189 9.07952 8.55525 9.13089 8.37555L9.94214 5.5348C10.2465 4.47147 11.7535 4.47147 12.0578 5.5348L12.8691 8.37555C12.9204 8.55525 13.0167 8.7189 13.1489 8.85106C13.281 8.98322 13.4447 9.07952 13.6244 9.13089L16.4651 9.94214C17.5285 10.2465 17.5285 11.7535 16.4651 12.0578L13.6244 12.8691C13.4447 12.9204 13.281 13.0167 13.1489 13.1489C13.0167 13.281 12.9204 13.4447 12.8691 13.6244M17.9391 18.073L17.5945 19.4553C17.5486 19.6405 17.2856 19.6405 17.2388 19.4553L16.8932 18.073C16.8851 18.0409 16.8685 18.0116 16.8451 17.9882C16.8217 17.9648 16.7924 17.9481 16.7603 17.9401L15.378 17.5945C15.1928 17.5486 15.1928 17.2856 15.378 17.2388L16.7603 16.8932C16.7924 16.8851 16.8217 16.8685 16.8451 16.8451C16.8685 16.8217 16.8851 16.7924 16.8932 16.7603L17.2388 15.378C17.2846 15.1928 17.5477 15.1928 17.5945 15.378L17.9401 16.7603C17.9481 16.7924 17.9648 16.8217 17.9882 16.8451C18.0116 16.8685 18.0409 16.8851 18.073 16.8932L19.4553 17.2388C19.6405 17.2846 19.6405 17.5477 19.4553 17.5945L18.073 17.9401C18.0409 17.9481 18.0116 17.9648 17.9882 17.9882C17.9648 18.0116 17.9472 18.0409 17.9391 18.073ZM5.1058 5.23964L4.76114 6.62197C4.7153 6.80714 4.4513 6.80714 4.40547 6.62197L4.05989 5.23964C4.05179 5.20755 4.03516 5.17825 4.01176 5.15485C3.98836 5.13145 3.95906 5.11482 3.92697 5.10672L2.54464 4.76114C2.35947 4.7153 2.35947 4.4513 2.54464 4.40547L3.92697 4.05989C3.95906 4.05179 3.98836 4.03516 4.01176 4.01176C4.03516 3.98836 4.05179 3.95906 4.05989 3.92697L4.40547 2.54464C4.4513 2.35947 4.7153 2.35947 4.76114 2.54464L5.10672 3.92697C5.11482 3.95906 5.13145 3.98836 5.15485 4.01176C5.17825 4.03516 5.20755 4.05179 5.23964 4.05989L6.62197 4.40547C6.80714 4.4513 6.80714 4.7153 6.62197 4.76114L5.23964 5.10672C5.20755 5.11482 5.17825 5.13145 5.15485 5.15485C5.13145 5.17825 5.1139 5.20755 5.1058 5.23964Z"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="1.5"
                />
              </svg>
              <span>Hyperscaler AI</span>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 z-20 flex h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-white font-semibold text-[#111111] text-sm shadow-[0_2px_6px_rgba(0,0,0,0.06)] sm:h-[64px] sm:w-[64px] sm:text-lg">
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
          href="https://calendly.com/ujjwalroy1/hyperscaler-scale-your-build"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Button className="mt-[40px]" size="lg" variant={"gradient"}>
            Book a free session
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default WhyChooseUs;
