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
    <section className="w-full bg-white pt-[150px] max-sm:pt-20 px-20 max-sm:px-6">
      <div className="mx-auto flex w-11/12 flex-col items-center lg:w-10/12">
        <div className="text-center">
          <h2 className="font-semibold text-[#1f1f1f] text-xl leading-[1.1] tracking-[-0.03em] md:text-5xl">
            Trusted by CEOs and Founders
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-[1.6]">
            From launch to scale, top executives trust Hyperscaler to drive
            measurable results.
          </p>
        </div>

        <div className="mt-[72px] grid w-full grid-cols-1 justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3">
          {testimonialCards.map((card, index) => (
            <div className="w-full" key={index}>
              <Image
                alt={card.alt}
                className="h-auto w-full object-contain"
                height={340}
                priority={index < 3}
                src={card.src}
                width={406}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
