import Image from "next/image";

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
    <section className="w-full bg-white py-[110px]">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="text-center">
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1f1f1f]">
            Trusted by CEOs and Founders
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-[#6b7280]">
            From launch to scale, top executives trust Hyperscaler to drive measurable results.
          </p>
        </div>

        <div className="mt-[72px] grid w-full grid-cols-1 justify-items-center gap-x-[28px] gap-y-[28px] md:grid-cols-2 xl:grid-cols-3">
          {testimonialCards.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-[380px]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={406}
                height={341}
                className="h-auto w-full object-contain"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;