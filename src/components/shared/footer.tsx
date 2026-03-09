import type { LucideProps } from "lucide-react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PlaceholderLink({ children }: { children: React.ReactNode }) {
  return <Link href="/#">{children}</Link>;
}

const PinterestIcon = (props: LucideProps) => (
  <svg
    aria-hidden
    fill="currentColor"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Pinterest icon</title>
    <path d="M12 0C5.372 0 0 5.373 0 12c0 4.908 3.052 9.108 7.375 10.795-.102-.918-.195-2.331.04-3.335.212-.903 1.364-5.751 1.364-5.751s-.348-.696-.348-1.724c0-1.614.936-2.82 2.101-2.82.989 0 1.467.743 1.467 1.635 0 .996-.635 2.486-.963 3.869-.274 1.161.581 2.107 1.721 2.107 2.065 0 3.646-2.179 3.646-5.321 0-2.784-2-4.737-4.852-4.737-3.306 0-5.252 2.478-5.252 5.038 0 1.001.384 2.078.864 2.663.095.115.109.216.08.333-.087.364-.28 1.161-.318 1.324-.05.212-.163.257-.379.155-1.411-.655-2.29-2.711-2.29-4.365 0-3.553 2.582-6.812 7.44-6.812 3.901 0 6.931 2.781 6.931 6.494 0 3.876-2.447 7.002-5.838 7.002-1.14 0-2.212-.592-2.578-1.285l-.701 2.668c-.253.972-.939 2.186-1.401 2.929 1.047.323 2.155.497 3.309.497 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const TikTokIcon = (props: LucideProps) => (
  <svg
    aria-hidden
    fill="currentColor"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>TikTok icon</title>
    <path d="M21.094 7.178a6.09 6.09 0 0 1-3.61-1.166v7.356a6.632 6.632 0 1 1-6.631-6.63c.227 0 .448.02.668.043v3.819a2.891 2.891 0 1 0 2.893 2.89V0h3.07a6.09 6.09 0 0 0 6.092 6.09v3.07a6.07 6.07 0 0 1-2.482-.617z" />
  </svg>
);

const socialLinks = [
  {
    icon: Twitter,
    href: "https://twitter.com/scalebuildai",
    label: "Twitter",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/scalebuildai",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/scalebuildai",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/scalebuildai",
    label: "Instagram",
  },
  {
    icon: PinterestIcon,
    href: "https://www.pinterest.es/scalebuildai/",
    label: "Pinterest",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@scalebuildai?_t=8foXTR0OSKP&_r=1",
    label: "Tiktok",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#190624]">
      <div className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 pt-10 pb-10 md:gap-10 md:pt-12 lg:w-10/12 lg:gap-13 lg:pt-16">
        <div className="grid w-full grid-cols-1 gap-8 text-white sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & branding */}
          <div className="flex flex-col items-start">
            <PlaceholderLink>
              <span className="flex items-center gap-2">
                <Image
                  alt="Hyperscaler logo"
                  height={30}
                  src="/logo-without-text.png"
                  width={54}
                />
                <span className="font-semibold text-2xl text-white">
                  Hyperscaler
                </span>
              </span>
            </PlaceholderLink>
            <p className="mt-4 max-w-xs text-[#9CA3AF] text-lg leading-relaxed">
              Scale your business with AI-driven services. Simple, powerful, and
              built for growth.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-lg text-white">Product</h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-lg">
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/resources">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg text-white">Legal</h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-lg">
              <li>
                <Link
                  href="https://scalebuild.ai/privacy-and-policy"
                  rel="noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://scalebuild.ai/terms-of-service"
                  rel="noreferrer"
                  target="_blank"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="https://scalebuild.ai/cookie-policy"
                  rel="noreferrer"
                  target="_blank"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg text-white">
              Contact Information
            </h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-lg">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a href="mailto:contact@scalebuild.ai">contact@scalebuild.ai</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>Manhattan, NYC</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href="tel:+19195766153">+1 919 576 6153</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials + copyright */}
        <div className="flex w-full flex-col items-center gap-4 border-[#374151] border-t pt-16">
          <div className="mb-2 flex flex-wrap justify-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                aria-label={label}
                className="flex size-12 items-center justify-center rounded-full bg-[#ECD6F8] text-[#1A1A1A] transition-colors hover:bg-purple-200"
                href={href}
                key={label}
                rel="noreferrer"
                target={href.startsWith("http") ? "_blank" : undefined}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>

          <p className="text-[#9CA3AF] text-lg">
            &copy; {new Date().getFullYear()} Hyperscaler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
