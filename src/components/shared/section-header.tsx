interface SectionHeaderProps {
  titlePart1: string;
  gradientTitle?: string;
  titlePart3?: string;
  description?: string;
}

export function SectionHeader({
  titlePart1,
  gradientTitle,
  titlePart3,
  description,
}: SectionHeaderProps) {
  return (
    <div className="relative z-10 text-center">
      <h2 className="font-['Outfit'] font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-5xl">
        {titlePart1}
        {gradientTitle && (
          <span className="bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}
            {gradientTitle}{" "}
          </span>
        )}
        {titlePart3 && titlePart3}
      </h2>
      {description ? (
        <p className="mt-2 font-['Inter'] font-normal text-[#515A65] text-lg leading-[1.4] tracking-[0] md:text-2xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
