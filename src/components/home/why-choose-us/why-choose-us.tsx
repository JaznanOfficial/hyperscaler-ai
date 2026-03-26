import Image from "next/image";

const createPlaceholderSrc = (label: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='560' height='320'>
    <rect width='100%' height='100%' rx='24' fill='#f3e8ff'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, sans-serif' font-size='20' fill='#7c3aed' font-weight='600'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

type Step = {
  description: string;
  id: string;
  title: string;
};

type Visual = {
  alt: string;
  id: string;
  src: string;
  subtitle: string;
  title: string;
};

const steps: Step[] = [
  {
    id: "01",
    title: "Log In",
    description:
      "Create your account in seconds and access your personalized marketing dashboard.",
  },
  {
    id: "02",
    title: "Chat with Eva (AI CMO)",
    description:
      "Tell Eva your goals and she'll craft a tailored marketing strategy just for you.",
  },
  {
    id: "03",
    title: "Book a call",
    description:
      "Schedule a quick strategy session with our growth experts to fine-tune your plan.",
  },
  {
    id: "04",
    title: "Automate your marketing within hours",
    description:
      "Launch campaigns on autopilot — ads, emails, and content, all running seamlessly.",
  },
];

const placeholderVisuals: Visual[] = [
  {
    id: "login",
    alt: "Login placeholder",
    title: "Login to your account",
    subtitle: "client@example.com",
    src: createPlaceholderSrc("Login placeholder"),
  },
  {
    id: "chat",
    alt: "Eva chat placeholder",
    title: "Chat with Eva",
    subtitle: "Why is my reply rate low?",
    src: createPlaceholderSrc("Chat placeholder"),
  },
  {
    id: "calendar",
    alt: "Calendar placeholder",
    title: "Strategy call booked",
    subtitle: "Thu, Mar 26 · 2:00 PM",
    src: createPlaceholderSrc("Strategy placeholder"),
  },
];

const scenes = [
  {
    id: "scene-1",
    steps: [steps[0]],
    visual: placeholderVisuals[0],
  },
  {
    id: "scene-2",
    steps: [steps[1]],
    visual: placeholderVisuals[1],
  },
  {
    id: "scene-3",
    steps: [steps[2], steps[3]],
    visual: placeholderVisuals[2],
  },
];

const StepDetail = ({ step }: { step: Step }) => (
  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-6">
    <span className="font-['Outfit'] font-medium text-3xl text-[#0f0f0f] leading-[48px]">
      {step.id}
    </span>
    <div className="space-y-2.5">
      <h3 className="font-['Outfit'] font-medium text-3xl text-[#1a1a1a] leading-[48px]">
        {step.title}
      </h3>
      <p className="font-['Inter'] font-normal text-[#6b7280] text-base leading-6">
        {step.description}
      </p>
    </div>
  </div>
);

const VisualCard = ({ visual }: { visual: Visual }) => (
  <div className="w-full rounded-3xl border border-[#e4e4e7] bg-white p-6 shadow-[0px_8px_40px_rgba(0,0,0,0.08)]">
    <Image
      alt={visual.alt}
      className="h-64 w-full rounded-2xl object-cover"
      height={320}
      src={visual.src}
      unoptimized
      width={560}
    />
    <div className="mt-4 text-center">
      <p className="font-['Outfit'] font-medium text-[#111322] text-lg">
        {visual.title}
      </p>
      <p className="font-['Inter'] text-[#9ca3af] text-sm">{visual.subtitle}</p>
    </div>
  </div>
);

const HowHyperscalerWorks = () => {
  return (
    <section className="mx-auto w-full px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-16">
        <div className="text-center">
          <p className="font-['Outfit'] font-medium text-4xl text-[#111322] leading-[56px]">
            How Hyperscaler Works
          </p>
        </div>

        <div className="hidden flex-col gap-20 lg:flex">
          {scenes.map((scene) => (
            <div
              className="grid grid-cols-[minmax(0,620px)_minmax(0,520px)] items-start gap-12"
              key={scene.id}
            >
              <div className="relative flex min-h-[256px] flex-col gap-10">
                <span className="absolute top-2 left-[14px] h-[calc(100%-16px)] w-[3px] bg-gradient-to-b from-[#f0abfc] via-[#c084fc] to-[#8b5cf6] opacity-80" />
                <div className="relative flex min-h-[256px] flex-col gap-10">
                  {scene.steps.length > 1 ? (
                    <div className="flex h-full flex-col justify-between">
                      <StepDetail step={scene.steps[0]} />
                      <StepDetail step={scene.steps[1]} />
                    </div>
                  ) : (
                    scene.steps.map((step) => (
                      <StepDetail key={step.id} step={step} />
                    ))
                  )}
                </div>
              </div>
              <VisualCard visual={scene.visual} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-16 lg:hidden">
          {scenes.map((scene) => (
            <div className="space-y-6" key={scene.id}>
              {scene.steps.map((step) => (
                <StepDetail key={step.id} step={step} />
              ))}
              <VisualCard visual={scene.visual} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowHyperscalerWorks;
