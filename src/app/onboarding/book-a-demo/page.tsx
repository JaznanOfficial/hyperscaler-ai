"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CALENDLY_URL =
  "https://calendly.com/ujjwalroy1/hyperscaler-scale-your-build";
const SUCCESS_URL = "/onboarding/book-a-demo/success";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const anonId = searchParams.get("anonId");

  useEffect(() => {
    if (status === "loading") return;
    if (!(isAuthenticated || anonId)) {
      router.replace("/onboarding/business");
    }
  }, [anonId, isAuthenticated, router, status]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "object" || e.data === null) return;
      if ((e.data as { event?: string }).event !== "calendly.event_scheduled")
        return;

      router.push(SUCCESS_URL);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div>
      <div
        className="calendly-inline-widget"
        data-url={CALENDLY_URL}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
