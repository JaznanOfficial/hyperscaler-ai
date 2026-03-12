const policySections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using Hyperscaler services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any part of these terms, you should not use our website, platform, or related services.",
    ],
  },
  {
    title: "2. Services Provided",
    content: [
      "Hyperscaler provides AI-supported growth, marketing, and product execution services, including platform tools, automation workflows, and consulting support.",
      "We may update, modify, or discontinue parts of the services at any time to improve performance, security, or user experience.",
    ],
  },
  {
    title: "3. Account Responsibilities",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      "You agree to provide accurate information and promptly update account details when changes occur.",
    ],
  },
  {
    title: "4. Acceptable Use",
    content: [
      "You agree not to misuse the services, including unauthorized access attempts, fraudulent activity, reverse engineering, or violating applicable laws.",
      "We reserve the right to suspend or terminate access if we detect abuse, security threats, or policy violations.",
    ],
  },
  {
    title: "5. Fees and Payments",
    content: [
      "Paid services are billed according to the selected plan, proposal, or agreement terms. All fees are due as specified at checkout or in contract documents.",
      "Late or failed payments may result in service interruptions, restricted features, or account suspension until payment issues are resolved.",
    ],
  },
  {
    title: "6. Intellectual Property",
    content: [
      "All platform content, branding, software, and materials provided by Hyperscaler remain our intellectual property unless otherwise stated in writing.",
      "You retain ownership of your business data and materials you submit, while granting us necessary rights to process them for service delivery.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Hyperscaler is not liable for indirect, incidental, special, or consequential damages arising from service use.",
      "Our total liability for claims related to the services will not exceed the amount paid by you for the relevant service period.",
    ],
  },
  {
    title: "8. Termination and Changes",
    content: [
      "Either party may terminate service access according to the applicable contract or plan terms. We may also suspend access for legal or security reasons.",
      "We may revise these Terms from time to time. Updated terms will be posted on this page with a revised effective date.",
    ],
  },
];

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="max-w-3xl text-[#515A65] text-sm leading-relaxed md:text-base">
              This is a placeholder Terms of Service page for demonstration
              purposes. It outlines the core conditions for using Hyperscaler
              services, platform tools, and related offerings.
            </p>
            <p className="text-[#7C8490] text-xs md:text-sm">
              Effective date: March 12, 2026
            </p>
          </header>

          <div className="">
            {policySections.map((section) => (
              <article className=" p-5 md:p-6" key={section.title}>
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
            If you have any terms-related questions, contact us at{" "}
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
  