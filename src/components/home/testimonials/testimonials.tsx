import Image from "next/image";
import { FadeInUp } from "@/components/animations/fade-in-up";

const testimonialCards = [
  {
    src: "/testimonials/tst-01.png",
    alt: "Testimonial from Parfait",
  },
  {
    src: "/testimonials/tst-02.png",
    alt: "Testimonial from John Carey",
  },
  {
    src: "/testimonials/tst-03.png",
    alt: "Testimonial from Steve Dickerman",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-white pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="mx-auto flex flex-col items-center lg:w-10/12">
        <div className="mx-auto mb-20 max-w-6xl text-center">
          <h2 className="font-semibold text-[#1f1f1f] text-[32px] leading-[1.08] tracking-[-0.03em] md:text-[32px]">
            Trusted by CEOs and Founders
          </h2>

          <p className="mx-auto mt-[10px] text-[#6b7280] text-[16px] leading-[1.45] max-sm:text-[16px] md:text-lg">
            From launch to scale, top executives trust Hyperscaler to drive
            measurable results.
          </p>
        </div>

        <div className="mt-[72px] grid w-full grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3">
          {testimonialCards.map((card, index) => (
            <FadeInUp delay={0.2 + 0.1 * index} key={index}>
              <div className="w-full">
                <Image
                  alt={card.alt}
                  className="h-auto w-full object-contain"
                  height={340}
                  priority={index < 3}
                  src={card.src}
                  width={406}
                />
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
