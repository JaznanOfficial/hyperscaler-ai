export interface CartItem {
  id: string;
  title: string;
  description: string;
  badge?: "Popular" | "New";
  price: number;
  displayPrice?: number;
  cadence: string;
}

export const sampleCartItems: CartItem[] = [
  {
    id: "paid-ads-1",
    title: "Paid Ads",
    description:
      "Launch, optimize, and scale paid campaigns with full visibility on spend, performance, and ROI.",
    badge: "Popular",
    price: 50,
    displayPrice: 500,
    cadence: "/month",
  },
  {
    id: "paid-ads-2",
    title: "Paid Ads",
    description:
      "Launch, optimize, and scale paid campaigns with full visibility on spend, performance, and ROI.",
    badge: "Popular",
    price: 50,
    displayPrice: 500,
    cadence: "/month",
  },
];
