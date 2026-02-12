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
      <h2 className="font-['Outfit'] font-medium text-2xl text-[#1A1A1A] leading-[1.4] tracking-[0] sm:text-[28px] md:text-[32px]">
        {titlePart1}
        {gradientTitle && (
          <span className="bg-linear-to-r from-[#6B46C1] to-[#9E32DD] bg-clip-text text-transparent">
            {" "}
            {gradientTitle}{" "}
          </span>
        )}
        {titlePart3 && titlePart3}
      </h2>
      {description ? (
        <p className="mt-2 font-['Inter'] font-normal text-[#515A65] text-sm leading-[1.4] tracking-[0] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
