const policySections = [
  {
    title: "1. What Are Cookies",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, session details, and browsing behavior over time.",
      "In this policy, the term cookies may also include similar technologies such as local storage, pixels, and tracking scripts used for analytics and functionality.",
    ],
  },
  {
    title: "2. Types of Cookies We Use",
    content: [
      "Essential Cookies: Required for core site functionality such as navigation, authentication, and security.",
      "Performance and Analytics Cookies: Help us understand how visitors use our site so we can improve speed, reliability, and user experience.",
    ],
  },
  {
    title: "3. Functional Cookies",
    content: [
      "Functional cookies remember choices such as language, region, and interface preferences to provide a more personalized experience.",
      "Disabling these cookies may cause some features to become unavailable or behave unexpectedly.",
    ],
  },
  {
    title: "4. Marketing and Advertising Cookies",
    content: [
      "Marketing cookies may be used to deliver relevant ads and measure campaign effectiveness across platforms.",
      "These cookies can track activity across websites and help us understand which campaigns drive engagement or conversions.",
    ],
  },
  {
    title: "5. Third-Party Cookies",
    content: [
      "Some cookies are set by trusted third-party services we use for analytics, embedded content, communications, and advertising tools.",
      "Each third-party provider processes data according to their own privacy and cookie policies.",
    ],
  },
  {
    title: "6. Cookie Duration",
    content: [
      "Session cookies are temporary and are removed when you close your browser.",
      "Persistent cookies remain on your device for a defined period or until manually deleted, depending on their purpose.",
    ],
  },
  {
    title: "7. Managing Cookies",
    content: [
      "You can control or delete cookies through your browser settings. Most browsers allow you to block all cookies or only third-party cookies.",
      "Please note that blocking essential cookies may impact core functionality of our website and services.",
    ],
  },
  {
    title: "8. Changes to This Cookie Policy",
    content: [
      "We may update this Cookie Policy periodically to reflect changes in legal requirements, technology, or our services.",
      "Any updates will be posted on this page with a revised effective date. Continued use of our site indicates acceptance of the updated policy.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <section className="mx-auto max-sm:py-20 py-[100px] px-20 max-sm:px-6"> 
      <div className="">
        <div
          aria-hidden
          className="-top-24 -right-24 pointer-events-none absolute h-64 w-64 rounded-full bg-linear-to-l from-fuchsia-200/40 to-violet-300/40 blur-3xl"
        />
        <div className="relative space-y-8">
          <header className="space-y-3">
            <p className="font-semibold text-[#9E32DD] text-sm uppercase tracking-[0.12em]">
              Legal
            </p>
            <h1 className="font-['Outfit'] font-semibold text-3xl text-[#1A1A1A] md:text-4xl">
              Cookie Policy
            </h1>
            <p className="max-w-3xl text-[#515A65] text-sm leading-relaxed md:text-base">
              This is a placeholder cookie policy for demonstration purposes. It
              explains how Hyperscaler uses cookies and similar technologies to
              improve performance, functionality, and user experience.
            </p>
            <p className="text-[#7C8490] text-xs md:text-sm">
              Effective date: March 12, 2026
            </p>
          </header>

          <div className="">
            {policySections.map((section) => (
              <article
                className=" p-5 md:p-6"
                key={section.title}
              >
                <h2 className="font-['Outfit'] font-medium text-[#1A1A1A] text-lg md:text-xl">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-[#515A65] text-sm leading-relaxed md:text-base">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <footer className=" text-[#515A65] text-sm leading-relaxed md:text-base">
            If you have any cookie-related questions, contact us at{" "}
            <a
              className="font-medium text-[#9E32DD] underline decoration-[#9E32DD]/30 underline-offset-4"
              href="mailto:contact@scalebuild.ai"
            >
              contact@scalebuild.ai
            </a>
            .
          </footer>
        </div>
      </div>
    </section>
  );
}
