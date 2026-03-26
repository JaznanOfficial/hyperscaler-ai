"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const toolIcons = [
  {
    id: "instagram",
    src: "/marketing-tools/instagram.svg",
    positionClass: "-top-6 left-[16%]",
    sizeClass: "size-[84px] md:size-[96px] lg:size-[112px]",
    iconClass:
      "h-[44px] w-[44px] md:h-[52px] md:w-[52px] lg:h-[64px] lg:w-[64px]",
  },
  {
    id: "x",
    src: "/marketing-tools/x.svg",
    positionClass: "-top-2.5 right-[25%]",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
  {
    id: "slack",
    src: "/marketing-tools/slack-connect.svg",
    positionClass: "top-[18%] -right-7",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
  {
    id: "airtable",
    src: "/marketing-tools/airtable.svg",
    positionClass: "top-[22%] -left-6",
    sizeClass: "size-[60px] md:size-[72px] lg:size-[84px]",
    iconClass:
      "h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[44px] lg:w-[44px]",
  },
  {
    id: "google-ads",
    src: "/marketing-tools/google-ads.svg",
    positionClass: "top-[42%] -left-8",
    sizeClass: "size-[96px] md:size-[112px] lg:size-[128px]",
    iconClass:
      "h-[52px] w-[52px] md:h-[60px] md:w-[60px] lg:h-[72px] lg:w-[72px]",
  },
  {
    id: "youtube",
    src: "/marketing-tools/youtube.svg",
    positionClass: "top-[42%] -right-8",
    sizeClass: "size-[84px] md:size-[96px] lg:size-[112px]",
    iconClass:
      "h-[44px] w-[44px] md:h-[52px] md:w-[52px] lg:h-[64px] lg:w-[64px]",
  },
  {
    id: "facebook",
    src: "/marketing-tools/facebook.svg",
    positionClass: "bottom-[20%] -right-6",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
  {
    id: "linkedin",
    src: "/marketing-tools/linkedin.svg",
    positionClass: "bottom-[20%] -left-6",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
  {
    id: "telegram",
    src: "/marketing-tools/telegram.svg",
    positionClass: "-bottom-6 right-[18%]",
    sizeClass: "size-[60px] md:size-[72px] lg:size-[84px]",
    iconClass:
      "h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[44px] lg:w-[44px]",
  },
  {
    id: "reddit",
    src: "/marketing-tools/reddit.svg",
    positionClass: "-bottom-6 left-[20%]",
    sizeClass: "size-[60px] md:size-[72px] lg:size-[84px]",
    iconClass:
      "h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[44px] lg:w-[44px]",
  },
  {
    id: "miro",
    src: "/marketing-tools/miro.svg",
    positionClass: "-top-6 left-[42%]",
    sizeClass: "size-[96px] md:size-[112px] lg:size-[128px]",
    iconClass:
      "h-[52px] w-[52px] md:h-[60px] md:w-[60px] lg:h-[72px] lg:w-[72px]",
  },
  {
    id: "n8n",
    src: "/marketing-tools/n8n.svg",
    positionClass: "-bottom-6 right-[45%]",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
  {
    id: "bolt",
    src: "/marketing-tools/bolt.svg",
    positionClass: "top-[10%] right-[8%]",
    sizeClass: "size-[60px] md:size-[72px] lg:size-[84px]",
    iconClass:
      "h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[44px] lg:w-[44px]",
  },
  {
    id: "mainchimp",
    src: "/marketing-tools/mainchimp.svg",
    positionClass: "top-[10%] left-[8%]",
    sizeClass: "size-[60px] md:size-[72px] lg:size-[84px]",
    iconClass:
      "h-[32px] w-[32px] md:h-[38px] md:w-[38px] lg:h-[44px] lg:w-[44px]",
  },
  {
    id: "purplexity",
    src: "/marketing-tools/purplexity.svg",
    positionClass: "bottom-[10%] right-[8%]",
    sizeClass: "size-[72px] md:size-[84px] lg:size-[96px]",
    iconClass:
      "h-[38px] w-[38px] md:h-[44px] md:w-[44px] lg:h-[52px] lg:w-[52px]",
  },
];

const MarketingTools = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-28 max-sm:px-6 max-sm:pt-20">
      <div className="relative mx-auto flex min-h-[360px] max-w-4xl flex-col items-center justify-center gap-6 px-10 py-16 text-center">
        {toolIcons.map((icon) => (
          <div
            className={`absolute ${icon.positionClass} ${icon.sizeClass} flex items-center justify-center`}
            key={icon.id}
          >
            <Image
              alt=""
              className={icon.iconClass}
              height={48}
              src={icon.src}
              width={48}
            />
          </div>
        ))}

        <div className="flex flex-col items-center gap-4">
          <h2 className="font-['Outfit'] font-semibold text-[#111322] text-[32px]">
            30+ Marketing Tools,
            <br />
            One Platform
          </h2>
          <Button asChild className="px-6! py-5!" variant="gradient">
            <Link href="/contact">
              <Play className="size-4" />
              View Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketingTools;
