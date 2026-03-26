import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="my-24 flex items-center justify-center px-6">
      <div className="flex h-96 w-full max-w-5xl flex-col items-center justify-center gap-10 rounded-2xl bg-white p-5 text-center shadow-[0px_40px_140px_rgba(157,78,221,0.28)]">
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
          <Link href="/contact">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
