const policySections = [
  {
    title: "1. Information We Collect",
    content: [
      "We may collect personal information such as your name, email address, phone number, company details, and billing information when you sign up, request a demo, or contact us.",
      "We also collect usage information including browser type, device data, pages visited, and interactions with features to improve our platform.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use collected information to provide and maintain services, process transactions, personalize your experience, and communicate product updates.",
      "Data may also be used for analytics, performance optimization, customer support, fraud prevention, and security monitoring.",
    ],
  },
  {
    title: "3. Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar technologies to remember preferences, analyze traffic, and improve product performance.",
      "You can control cookie settings through your browser, but disabling certain cookies may affect key functionality.",
    ],
  },
  {
    title: "4. Data Sharing and Disclosure",
    content: [
      "We do not sell your personal data. We may share information with trusted service providers who support hosting, payments, communication, and analytics.",
      "We may disclose data when required by law, to enforce our terms, or to protect our users, business, and legal rights.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "We apply technical and organizational safeguards designed to protect data from unauthorized access, alteration, disclosure, or loss.",
      "While we strive to use commercially acceptable means to protect your information, no method of transmission or storage is completely secure.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain personal information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.",
      "When data is no longer needed, we securely delete or anonymize it according to internal retention policies.",
    ],
  },
  {
    title: "7. Your Privacy Rights",
    content: [
      "Depending on your location, you may have rights to access, correct, delete, or restrict how your personal data is used.",
      "To exercise any rights, contact us and we will respond according to applicable data protection laws.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.",
      "Continued use of our services after changes become effective indicates acceptance of the updated policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto px-20 py-[100px] max-sm:px-6 max-sm:py-20">
      <div className="">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-linear-to-l from-fuchsia-200/40 to-violet-300/40 blur-3xl"
        />
        <div className="relative space-y-8">
          <header className="space-y-3">
            <p className="font-semibold text-[#9E32DD] text-sm uppercase tracking-[0.12em]">
              Legal
            </p>
            <h1 className="font-['Outfit'] font-semibold text-3xl text-[#1A1A1A] md:text-4xl">
              Privacy Policy
            </h1>
            <p className="max-w-3xl text-[#515A65] text-sm leading-relaxed md:text-base">
              This is a placeholder privacy policy for demonstration purposes.
              It describes how Hyperscaler may collect, use, and protect
              information when you use our website and services.
            </p>
            <p className="text-[#7C8490] text-xs md:text-sm">
              Effective date: March 12, 2026
            </p>
          </header>

          <div className="">
            {policySections.map((section) => (
              <article className="p-5 md:p-6" key={section.title}>
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

          <footer className="text-[#515A65] text-sm leading-relaxed md:text-base">
            If you have any privacy-related questions, contact us at{" "}
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
