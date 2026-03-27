"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarPreviewImage =
  "https://www.figma.com/api/mcp/asset/7742e611-3546-4f19-b3ca-30c73e278f6b";

const NEXT_STEPS = [
  "Add the invite to your calendar and join from the meeting link.",
  "Come prepared with your goals, timelines, and any links you can share.",
  "If you don’t see the email, check spam/promotions.",
];

export default function Page() {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsRemaining !== 0) return;
    router.push("/chat");
  }, [router, secondsRemaining]);

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden overflow-hidden bg-[#EBDDFA] lg:block">
        <div className="absolute -top-[350px] -left-[520px] h-[980px] w-[980px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[190px] -left-[360px] h-[760px] w-[760px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[60px] -left-[220px] h-[540px] w-[540px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute top-[90px] -left-[80px] h-[320px] w-[320px] rounded-full border border-[#DDC4F8]" />
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 h-full w-[78%] object-cover opacity-40"
          src={sidebarPreviewImage}
        />
        <div className="absolute inset-y-0 right-0 w-[64%] bg-linear-to-r from-[#EBDDFA]/0 to-white/85" />
      </section>

      <section className="flex min-h-svh items-center justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="w-full max-w-[640px]">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-[#A7E8BF] bg-[#D3F3DF] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
              <Check
                aria-hidden="true"
                className="size-7 text-[#15803D]"
                strokeWidth={3}
              />
            </span>

            <h1 className="font-['Outfit'] font-medium text-4xl text-[#1A1A1A] leading-[1.4] sm:text-[40px]">
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Thanks — your call is booked
              </span>
            </h1>
          </div>

          <div className="mx-auto mb-11 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-center max-w-[470px]">
            <p className="font-semibold text-base" style={{ fontFamily: "var(--font-outfit)" }}>
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Redirecting to Eva AI in {secondsRemaining}s…
              </span>
            </p>
          </div>

          <div className="mx-auto mb-11 max-w-[470px]">
            <p className="mb-[18px] font-medium text-[#515A65] text-sm leading-[1.4]">
              What happens next
            </p>

            <div className="space-y-[18px]">
              {NEXT_STEPS.map((step, index) => (
                <div className="flex h-10 items-center gap-3" key={step}>
                  <span className="flex size-[30px] items-center justify-center rounded-full border border-[#D1D1D1] bg-[#F5F5F5] font-semibold text-[#414851] text-sm leading-[1.4] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-[#1A1A1A] text-base leading-[1.4]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[#515A65] text-sm leading-normal">
            Need help before the call? Reply to the confirmation email.
          </p>
        </div>
      </section>
    </main>
  );
}
