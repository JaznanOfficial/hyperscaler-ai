import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectMedia {
  hero: { src: string; alt: string; width: number; height: number };
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  media: ProjectMedia;
}

const projects: Project[] = [
  {
    id: "ovanova",
    title: "Ovanova",
    category: "Clean Energy Project Management",
    description:
      'ScaleBuild AI partnered with Ovanova to support their mission of delivering clean, reliable energy solutions across the U.S. Through custom digital solutions and platform enhancements, we helped Ovanova streamline project management and expand their "Clean Energy for a Cause" initiative. This collaboration empowered Ovanova to scale community-focused microgrid deployments and strengthen engagement with non-profits and supporters nationwide.',
    tags: ["Website design", "Mobile & Web App"],
    media: {
      hero: {
        src: "/Hero-1.png",
        alt: "Ovanova dashboards",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "unreal-ai",
    title: "Unreal AI",
    category: "Autonomous AI Agents for Business Growth",
    description:
      "ScaleBuild AI partnered with Unreal AI to build a powerful platform that automates sales, marketing, and customer engagement using intelligent AI agents. We focused on creating a secure, scalable system with an intuitive UI that streamlines lead generation, personalized outreach, and performance tracking. The result: a cost-effective solution that boosts efficiency, allowing businesses to scale faster while AI handles the heavy lifting.",
    tags: ["Website design", "Mobile & Web App"],
    media: {
      hero: {
        src: "/Hero-2.png",
        alt: "Unreal AI dashboards",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "the-order-ai",
    title: "The Order AI",
    category: "Personalized Drink Recommendation Platform",
    description:
      "ScaleBuild AI partnered with The Order AI to create a mobile-first platform powered by LLMs that delivers personalized drink recommendations and seamless in-app ordering. The app intelligently suggests drinks based on user preferences, trends, and bar-specific specials—while also showcasing top-rated and best-selling options. We implemented advanced features like photo-based ingredient recognition, secure POS-integrated payments, and loyalty rewards. With added social elements like drink-sharing groups and responsible drinking games, The Order AI redefines the way users discover and enjoy beverages.",
    tags: ["Website design", "Mobile & Web App"],
    media: {
      hero: {
        src: "/Hero-3.png",
        alt: "The Order AI product mockups",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "college-wrapped",
    title: "College Wrapped",
    category: "AI-Powered College Match Platform",
    description:
      "College Wrapped uses AI to match students with their ideal colleges based on their preferences, hobbies, and GPA. By analyzing personal interests and academic performance, it provides tailored recommendations to help students make informed decisions. We crafted an intuitive platform that simplifies the college search process, making it more personalized, efficient, and stress-free.",
    tags: ["Web App"],
    media: {
      hero: {
        src: "/Hero-4.png",
        alt: "College Wrapped experience",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "flynepal",
    title: "FlyNepal",
    category: "Travel Experience Platform",
    description:
      "FlyNepal is a dynamic platform built in partnership with ScaleBuild AI to connect the global Nepalese community and travelers to the heart of Nepal. From seamless bookings for flights, hotels, and local services to curated products and cultural experiences, FlyNepal offers a personalized journey rooted in tradition and powered by technology. We built an intuitive AI-powered platform that unites locals, diaspora, and tourists—redefining how users explore and connect with Nepal.",
    tags: ["Website design", "Mobile & Web App"],
    media: {
      hero: {
        src: "/Hero-5.png",
        alt: "FlyNepal travel marketplace",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "booster-ai",
    title: "Booster AI",
    category: "AI & Avatar-Powered Savings App",
    description:
      "ScaleBuild AI collaborated with Booster AI to bring to life a revolutionary savings platform powered by intelligent AI and lifelike avatars. Designed to help users boost both their wallets and lifestyles, Booster AI blends smart financial tools with engaging digital experiences. We supported the development of a seamless, mobile-first interface, AI-driven savings automation, and personalized user journeys—all aligned with Booster's bold vision of reaching over 1 billion global users.",
    tags: ["Website design", "Mobile & Web App"],
    media: {
      hero: {
        src: "/Hero-6.png",
        alt: "Booster AI savings platform",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "credi-fi",
    title: "Credi Fi",
    category: "AI-Powered Smart Credit Score Planning",
    description:
      "CrediFi uses AI to provide real-time insights and personalized recommendations for smarter credit management. We designed an intuitive mobile and web experience, integrating AI-driven financial insights, real-time credit tracking, and interactive planning tools. Our seamless user interface ensures that individuals can effortlessly manage and optimize their credit scores with actionable guidance, empowering users to take control of their financial future with smart, automated credit strategies.",
    tags: ["Mobile App"],
    media: {
      hero: {
        src: "/Hero-7.png",
        alt: "Credi Fi credit planning app",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "eleven-a",
    title: "Eleven A",
    category: "Smart Networking for Modern Professionals",
    description:
      "11a is a next-gen business networking platform blending AI-powered matchmaking, CRM functionality, and social collaboration into one seamless experience. Designed for founders, investors, freelancers, and professionals, it helps users connect with the right people based on shared goals, roles, and industry interests. From swipe-style discovery and smart event-based connections to built-in CRM and business forums, 11a redefines professional networking—making it smarter, faster, and more human.",
    tags: ["Mobile App"],
    media: {
      hero: {
        src: "/Hero-8.png",
        alt: "Eleven A networking product",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "unreal-curry",
    title: "Unreal Curry",
    category: "Himalayan-Inspired Culinary Experience",
    description:
      "We helped Unreal Curry craft a bold digital identity to match their rich culinary offerings—from steamy momos to creamy curries. Our design and tech support elevated their food truck presence with engaging branding, menu highlights, and location-driven engagement strategies. The result? A flavorful brand experience as unforgettable as their dishes.",
    tags: ["Website design"],
    media: {
      hero: {
        src: "/Hero-9.png",
        alt: "Unreal Curry brand system",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "scalefit-ai",
    title: "Scalefit AI",
    category: "AI-Powered Health & Wellness",
    description:
      "ScaleFit AI is a smart fitness app that blends AI-driven guidance with natural wellness solutions. From exploring organic recipes and nutrition insights to chatting with a virtual botanic doctor for personalized health advice, ScaleFit helps users achieve a balanced lifestyle. We designed an engaging, intuitive platform that empowers users to embrace holistic health through technology.",
    tags: ["Mobile App"],
    media: {
      hero: {
        src: "/Hero-10.png",
        alt: "Scalefit AI wellness companion",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "sangria",
    title: "Sangria",
    category: "AI-Powered Sales Enablement & Collaboration Platform",
    description:
      "Sangria is a smart collaboration and sales enablement platform built to help modern sales teams work faster and smarter. With seamless CRM integrations and real-time AI assistance, Sangria eliminates manual data entry, enhances deal collaboration, and coaches reps through complex B2B sales frameworks like MEDDPICC. Sangria brings clarity, efficiency, and insight into every stage of the sales process—empowering reps to close deals faster while giving managers the visibility they need to coach and lead effectively.",
    tags: ["SaaS Product"],
    media: {
      hero: {
        src: "/Hero-11.png",
        alt: "Sangria sales platform",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "fuel-ai",
    title: "Fuel AI",
    category: "AI-Powered Lead & Campaign Intelligence",
    description:
      "Fuel AI is an advanced AI-powered lead and campaign management system designed to transform how businesses engage with prospects. It tracks detailed user behavior across channels, analyzes campaign performance, and uses predictive intelligence to recommend timely next steps—like sending follow-ups or optimizing campaign flows. From lead scoring and segmentation to dynamic journey mapping, Fuel AI empowers teams to act faster, personalize outreach, and convert more leads with data-backed precision.",
    tags: ["SaaS Product"],
    media: {
      hero: {
        src: "/Hero-12.png",
        alt: "Fuel AI campaign intelligence",
        width: 1500,
        height: 950,
      },
    },
  },
  {
    id: "nomadlivings",
    title: "NoMadLivings",
    category: "Smart Room Booking for Modern Nomads",
    description:
      "NomadLivings is a smart, traveler-first room booking platform built for modern nomads and remote professionals. It helps users discover flexible stays worldwide, track availability in real time, and book with ease. From personalized recommendations to seamless check-ins, NomadLivings simplifies every step of the journey—making travel feel more like home, wherever you go.",
    tags: ["Web App"],
    media: {
      hero: {
        src: "/Hero-13.png",
        alt: "NoMadLivings booking flow",
        width: 1500,
        height: 950,
      },
    },
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-11/12 py-12 lg:w-10/12">
      <div className="mb-10 text-center lg:mb-20">
        <h1 className="mt-2 font-['Outfit'] font-semibold text-4xl text-slate-900">
          Browse Services
        </h1>
        <p className="mt-5 font-normal text-slate-700 text-xl leading-7">
          Choose a service and track everything in one dashboard
        </p>
      </div>

      <div className="space-y-20 lg:space-y-40">
        {projects.map((project, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              className={cn(
                "flex flex-col items-center gap-10 lg:flex-row",
                isReversed && "lg:flex-row-reverse"
              )}
              key={project.id}
            >
              <div className="relative w-full lg:w-3/5">
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    alt={project.media.hero.alt}
                    className="h-full w-full rounded-t-lg object-cover"
                    height={project.media.hero.height}
                    src={project.media.hero.src}
                    width={project.media.hero.width}
                  />
                </div>
              </div>

              <div className="space-y-4 text-left lg:w-2/5">
                <div className="space-y-3">
                  <h2 className="font-['Outfit'] font-medium text-3xl text-slate-900 leading-10">
                    {project.title}
                  </h2>
                  <p className="font-medium text-purple-600 text-sm leading-5">
                    {project.category}
                  </p>
                </div>
                <p className="text-base text-slate-600 leading-7">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <Badge
                      className="h-7 rounded-full bg-purple-600 px-3 py-1 text-white"
                      key={tag}
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
