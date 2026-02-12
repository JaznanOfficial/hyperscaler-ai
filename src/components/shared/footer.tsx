import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PlaceholderLink({ children }: { children: React.ReactNode }) {
  return <Link href="/#">{children}</Link>;
}

function PlaceholderAnchor({ children }: { children: React.ReactNode }) {
  return <a href="/#">{children}</a>;
}

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
                <span className="font-semibold text-lg text-white">
                  Hyperscaler
                </span>
              </span>
            </PlaceholderLink>
            <p className="mt-4 max-w-xs text-[#9CA3AF] text-sm leading-relaxed">
              Scale your business with AI-driven services. Simple, powerful, and
              built for growth.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-base text-white">Product</h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-sm">
              <li>
                <PlaceholderLink>Services</PlaceholderLink>
              </li>
              <li>
                <PlaceholderLink>Pricing</PlaceholderLink>
              </li>
              <li>
                <PlaceholderLink>FAQs</PlaceholderLink>
              </li>
              <li>
                <PlaceholderLink>Cart</PlaceholderLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-base text-white">Legal</h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-sm">
              <li>
                <PlaceholderLink>Privacy Policy</PlaceholderLink>
              </li>
              <li>
                <PlaceholderLink>Terms of Service</PlaceholderLink>
              </li>
              <li>
                <PlaceholderLink>Cookie Policy</PlaceholderLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-base text-white">
              Contact Information
            </h4>
            <ul className="mt-4 space-y-3 text-[#9CA3AF] text-sm">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <PlaceholderAnchor>
                  Hyperscaler@Scalebuild.com
                </PlaceholderAnchor>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <PlaceholderAnchor>+980909032</PlaceholderAnchor>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials + copyright */}
        <div className="flex w-full flex-col items-center gap-4 border-[#374151] border-t pt-16">
          <div className="mb-2 flex gap-3">
            <PlaceholderAnchor>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#ECD6F8] text-[#1A1A1A] transition-colors hover:bg-purple-200">
                <Twitter className="size-5" />
              </span>
            </PlaceholderAnchor>
            <PlaceholderAnchor>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#ECD6F8] text-[#1A1A1A] transition-colors hover:bg-purple-200">
                <Linkedin className="size-5" />
              </span>
            </PlaceholderAnchor>
            <PlaceholderAnchor>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#ECD6F8] text-[#1A1A1A] transition-colors hover:bg-purple-200">
                <Github className="size-5" />
              </span>
            </PlaceholderAnchor>
          </div>

          <p className="text-[#9CA3AF] text-sm">
            &copy; {new Date().getFullYear()} Hyperscaler. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
