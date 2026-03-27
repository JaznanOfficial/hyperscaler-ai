import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero02 = () => {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-[1480px] overflow-hidden bg-white max-sm:px-6 lg:px-20">
      {/* Subtle purple gradient top-right */}
      <div
        className="pointer-events-none absolute top-1/4 -right-20 z-0 h-96 w-96 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 z-0 h-72 w-72 rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col justify-center max-sm:mt-20 max-sm:items-center max-sm:text-center">
            {/* Pill tagline */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-purple-50 px-4 py-2">
              <svg
                fill="none"
                height="16"
                viewBox="0 0 16 16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 1.33332V3.99999M14.6667 2.66666H12M7.34466 1.87599C7.37323 1.72306 7.45438 1.58493 7.57406 1.48553C7.69374 1.38614 7.84442 1.33173 8 1.33173C8.15557 1.33173 8.30625 1.38614 8.42593 1.48553C8.54561 1.58493 8.62677 1.72306 8.65533 1.87599L9.356 5.58132C9.40576 5.84475 9.53378 6.08707 9.72335 6.27664C9.91292 6.46621 10.1552 6.59423 10.4187 6.64399L14.124 7.34466C14.2769 7.37322 14.4151 7.45437 14.5145 7.57405C14.6138 7.69374 14.6683 7.84441 14.6683 7.99999C14.6683 8.15557 14.6138 8.30624 14.5145 8.42592C14.4151 8.54561 14.2769 8.62676 14.124 8.65532L10.4187 9.35599C10.1552 9.40575 9.91292 9.53377 9.72335 9.72334C9.53378 9.91291 9.40576 10.1552 9.356 10.4187L8.65533 14.124C8.62677 14.2769 8.54561 14.415 8.42593 14.5144C8.30625 14.6138 8.15557 14.6683 8 14.6683C7.84442 14.6683 7.69374 14.6138 7.57406 14.5144C7.45438 14.415 7.37323 14.2769 7.34466 14.124L6.644 10.4187C6.59423 10.1552 6.46621 9.91291 6.27664 9.72334C6.08707 9.53377 5.84476 9.40575 5.58133 9.35599L1.876 8.65532C1.72307 8.62676 1.58494 8.54561 1.48554 8.42592C1.38614 8.30624 1.33173 8.15557 1.33173 7.99999C1.33173 7.84441 1.38614 7.69374 1.48554 7.57405C1.58494 7.45437 1.72307 7.37322 1.876 7.34466L5.58133 6.64399C5.84476 6.59423 6.08707 6.46621 6.27664 6.27664C6.46621 6.08707 6.59423 5.84475 6.644 5.58132L7.34466 1.87599ZM4 13.3333C4 14.0697 3.40304 14.6667 2.66666 14.6667C1.93028 14.6667 1.33333 14.0697 1.33333 13.3333C1.33333 12.5969 1.93028 12 2.66666 12C3.40304 12 4 12.5969 4 13.3333Z"
                  stroke="#9E32DD"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="font-medium text-[14px] text-purple-600 max-sm:text-[12px]">
                AI-Powered Growth & Development Platform
              </span>
            </div>

            <h1 className="font-['Outfit'] font-semibold text-5xl text-[#1A1A1A] leading-tight max-sm:text-3xl max-sm:leading-10">
              Your Marketing on Autopilot
            </h1>

            {/* Quoted tagline */}
            <div className="mt-6 flex gap-2 rounded-2xl border border-[#E0E0E0] bg-white px-5 py-4 shadow-[0px_2px_4px_0px_rgba(158,50,221,0.08)] max-sm:mx-auto">
              <Quote
                className="shrink-0 rotate-180 text-purple-600"
                fill="currentColor"
                size={20}
                strokeWidth={2.2}
              />
              <p className="font-['Outfit'] font-medium text-purple-600 text-xl leading-6 max-sm:text-base">
                Generate Leads and Scale Marketing Without Agencies or Extra
                Teams.
              </p>
            </div>

            <p className="mt-5 font-['Outfit'] font-normal text-gray-600 text-xl leading-7 max-sm:text-base">
              AI-powered growth systems that run paid ads, outreach, and demand
              generation from one platform with clean human touch.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full flex-col gap-3 max-sm:items-center sm:flex-row sm:gap-4">
              <Link className="w-full sm:w-auto" href="/chat">
                <Button
                  className="h-[46px] w-full font-semibold sm:w-[228px]"
                  size="lg"
                  variant="gradient"
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7 12.3858L10.9617 14.9683C10.685 15.935 9.315 15.935 9.03833 14.9683L8.30083 12.3858C8.25414 12.2225 8.16659 12.0737 8.04644 11.9535C7.9263 11.8334 7.77753 11.7459 7.61416 11.6992L5.03166 10.9617C4.065 10.685 4.065 9.31499 5.03166 9.03832L7.61416 8.30082C7.77753 8.25413 7.9263 8.16658 8.04644 8.04644C8.16659 7.92629 8.25414 7.77752 8.30083 7.61416L9.03833 5.03166C9.315 4.06499 10.685 4.06499 10.9617 5.03166L11.6992 7.61416C11.7459 7.77752 11.8334 7.92629 11.9536 8.04644C12.0737 8.16658 12.2225 8.25413 12.3858 8.30082L14.9683 9.03832C15.935 9.31499 15.935 10.685 14.9683 10.9617L12.3858 11.6992C12.2225 11.7459 12.0737 11.8334 11.9536 11.9535C11.8334 12.0737 11.7459 12.2225 11.6992 12.3858M16.3083 16.43L15.995 17.6867C15.9533 17.855 15.7142 17.855 15.6717 17.6867L15.3575 16.43C15.3501 16.4008 15.335 16.3742 15.3137 16.3529C15.2925 16.3316 15.2658 16.3165 15.2367 16.3092L13.98 15.995C13.8117 15.9533 13.8117 15.7142 13.98 15.6717L15.2367 15.3575C15.2658 15.3501 15.2925 15.335 15.3137 15.3137C15.335 15.2925 15.3501 15.2658 15.3575 15.2367L15.6717 13.98C15.7133 13.8117 15.9525 13.8117 15.995 13.98L16.3092 15.2367C16.3165 15.2658 16.3316 15.2925 16.3529 15.3137C16.3742 15.335 16.4008 15.3501 16.43 15.3575L17.6867 15.6717C17.855 15.7133 17.855 15.9525 17.6867 15.995L16.43 16.3092C16.4008 16.3165 16.3742 16.3316 16.3529 16.3529C16.3316 16.3742 16.3157 16.4008 16.3083 16.43ZM4.64166 4.76332L4.32833 6.01999C4.28666 6.18832 4.04666 6.18832 4.005 6.01999L3.69083 4.76332C3.68347 4.73415 3.66835 4.70752 3.64708 4.68624C3.6258 4.66497 3.59917 4.64985 3.57 4.64249L2.31333 4.32832C2.145 4.28666 2.145 4.04666 2.31333 4.00499L3.57 3.69082C3.59917 3.68346 3.6258 3.66834 3.64708 3.64707C3.66835 3.6258 3.68347 3.59916 3.69083 3.56999L4.005 2.31332C4.04666 2.14499 4.28666 2.14499 4.32833 2.31332L4.6425 3.56999C4.64986 3.59916 4.66497 3.6258 4.68625 3.64707C4.70752 3.66834 4.73416 3.68346 4.76333 3.69082L6.02 4.00499C6.18833 4.04666 6.18833 4.28666 6.02 4.32832L4.76333 4.64249C4.73416 4.64985 4.70752 4.66497 4.68625 4.68624C4.66497 4.70752 4.64902 4.73415 4.64166 4.76332Z"
                      fill="white"
                    />
                  </svg>
                  Talk to Eva AI
                </Button>
              </Link>
              {/* <Button
                className="h-[46px] w-full font-semibold sm:w-[228px]"
                size="lg"
                variant="outline"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 2.25L14.25 9L3.75 15.75V2.25Z"
                    stroke="#515A65"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View Demo
              </Button> */}
            </div>
          </div>

          {/* Right Column: Video + Floating Images */}
          <div className="relative flex min-h-[580px] items-center justify-center max-sm:min-h-[460px]">
            <div className="absolute top-1/2 left-1/2 h-[320px] w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl max-md:h-[200px] max-md:w-[350px]">
              <video
                autoPlay
                className="h-full w-full object-cover"
                controls={false}
                loop
                muted
                playsInline
                src={
                  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
                  "/platform_overview_2.mp4"
                }
              />
            </div>

            {/* Top-left floating image */}
            <Image
              alt="Total Spend - $5,000"
              className="absolute top-0 left-0 z-20 h-[140px] w-[160px] object-contain max-md:top-2 max-md:left-2 max-md:h-[100px] max-md:w-[120px]"
              height={140}
              src="/spend_distribution.png"
              style={{
                animation: "float 3s ease-in-out infinite",
              }}
              width={160}
            />

            {/* Bottom-right floating image */}
            <Image
              alt="Bugs Closed vs Opened"
              className="absolute right-0 bottom-0 z-20 h-[140px] w-[220px] object-contain max-md:right-2 max-md:bottom-2 max-md:h-[100px] max-md:w-[140px]"
              height={140}
              src="/chart_interaction.png"
              style={{
                animation: "float 3.5s ease-in-out 0.5s infinite",
              }}
              width={220}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero02;
