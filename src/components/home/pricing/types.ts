import type { ReactNode } from "react";

import type { ButtonVariant } from "@/components/ui/button";

export interface SavingsHighlight {
  title: string;
  subtitle: string;
}

export type PricingCta =
  | {
      type: "link";
      href: string;
      label: string;
      variant?: ButtonVariant;
    }
  | {
      type: "drawer";
      label: string;
      variant?: ButtonVariant;
    };

export interface PricingCard {
  icon: ReactNode;
  name: string;
  description: string;
  price: {
    amount: string;
    cadence: string;
    note: string;
  };
  comparisonLabel: string;
  savingsHighlight?: SavingsHighlight;
  cta: PricingCta;
  features: string[];
  highlight?: {
    label?: string;
  };
}

export interface TraditionalHiringRole {
  title: string;
  cost: string;
}
