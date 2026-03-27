import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="my-24 flex items-center justify-center px-6 lg:my-48">
      <div className="relative flex h-96 w-full flex-col items-center justify-center gap-10 overflow-visible rounded-2xl bg-white p-5 text-center shadow-[0px_40px_140px_rgba(157,78,221,0.28)] lg:max-w-4xl xl:max-w-5xl">
        <Image
          alt="CTA decoration"
          className="absolute hidden w-64 lg:-top-12 lg:-left-8 lg:block xl:-top-12 xl:-left-28"
          height={320}
          src="/call-to-action/cta-left-top.svg"
          width={320}
        />
        <Image
          alt="CTA decoration"
          className="absolute hidden w-64 lg:-top-14 lg:-right-10 lg:block xl:-top-8 xl:-right-20"
          height={320}
          src="/call-to-action/cta-right-top.svg"
          width={320}
        />
        <Image
          alt="CTA decoration"
          className="absolute -bottom-12 -left-12 hidden w-64 lg:block"
          height={320}
          src="/call-to-action/cta-left-bottom.svg"
          width={320}
        />
        <Image
          alt="CTA decoration"
          className="absolute -bottom-20 hidden w-64 lg:-right-12 lg:block xl:-right-32"
          height={320}
          src="/call-to-action/cta-right-bottom.svg"
          width={320}
        />
        <div className="flex flex-col items-center gap-4">
          <p className="font-semibold text-lg text-purple-600">
            Hard Launch With Hyperscaler
          </p>
          <h2 className="font-['Outfit'] font-medium text-3xl text-[#111322] max-md:text-2xl">
            AI efficiency with just enough human touch
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 font-medium text-[#586174] text-sm">
            <span>Marketing</span>
            <span className="size-1.5 rounded-full bg-[#D0D5DD]" />
            <span>Development</span>
            <span className="size-1.5 rounded-full bg-[#D0D5DD]" />
            <span>Growth</span>
          </div>
        </div>
        <Button asChild className="px-6! py-5!" variant="gradient">
          <Link href="/signup">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
