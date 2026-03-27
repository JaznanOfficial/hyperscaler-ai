import { FadeInUp } from "@/components/animations/fade-in-up";

type Step = {
  description: string;
  id: string;
  title: string;
};

type Visual = {
  alt: string;
  id: string;
  videoSrc: string;
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
    alt: "Login video",
    title: "Login to your account",
    subtitle: "client@example.com",
    videoSrc: "/how-it-works/video-1.mp4",
  },
  {
    id: "chat",
    alt: "Eva chat video",
    title: "Chat with Eva",
    subtitle: "Why is my reply rate low?",
    videoSrc: "/how-it-works/video-2.mp4",
  },
  {
    id: "calendar",
    alt: "Calendar video",
    title: "Strategy call booked",
    subtitle: "Thu, Mar 26 · 2:00 PM",
    videoSrc: "/how-it-works/video-3.mp4",
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
    steps: [steps[2]],
    visual: placeholderVisuals[2],
  },
];

const StepDetail = ({ step }: { step: Step }) => (
  <FadeInUp>
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
  </FadeInUp>
);

const VisualCard = ({ visual }: { visual: Visual }) => (
  <FadeInUp>
    <div className="w-fit overflow-hidden rounded-3xl">
      <video
        autoPlay
        className="h-full w-full object-contain"
        controls={false}
        loop
        muted
        playsInline
        src={visual.videoSrc}
      />
    </div>
  </FadeInUp>
);

const HowHyperscalerWorks = () => {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-20 pt-[150px] max-sm:px-6 max-sm:pt-20">
      <div className="mx-auto flex w-full flex-col items-stretch gap-16">
        <div className="text-center">
          <FadeInUp>
            <p className="font-['Outfit'] font-medium text-4xl text-[#111322] leading-[56px]">
              How Hyperscaler Works
            </p>
          </FadeInUp>
        </div>

        <div className="hidden flex-col gap-20 lg:flex">
          {scenes.map((scene, sceneIdx) => (
            <div key={scene.id}>
              <div className="grid grid-cols-[1fr_1fr] items-start gap-20">
                <div className="relative flex min-h-[256px] flex-col gap-10">
                  <div className="relative flex min-h-[256px] flex-col gap-10">
                    {scene.steps.map((step, stepIdx) => (
                      <div key={step.id}>
                        <StepDetail step={step} />
                        <div className="absolute top-15 left-[14px] h-100 w-[3px] xl:top-15 xl:h-160">
                          <span className="block h-full w-full bg-gradient-to-b from-fuchsia-500 to-violet-800 opacity-80" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <VisualCard visual={scene.visual} />
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_1fr] items-start gap-12">
            <div className="relative flex flex-col gap-10">
              <StepDetail step={steps[3]} />
            </div>
            <div />
          </div>
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
          <StepDetail step={steps[3]} />
        </div>
      </div>
    </section>
  );
};

export default HowHyperscalerWorks;
