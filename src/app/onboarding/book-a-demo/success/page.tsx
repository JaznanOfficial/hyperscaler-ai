import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-10 sm:py-14">
        <Card className="w-full max-w-xl">
          <CardHeader className="gap-2">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-1 ring-foreground/10">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="min-w-0">
                <CardTitle
                  className="text-2xl leading-tight"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                    Thanks — your call is booked
                  </span>
                </CardTitle>
                <CardDescription className="mt-1 text-base">
                  You’ll receive a calendar invite and a confirmation email
                  shortly.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-card px-4 py-3">
              <div className="font-medium">What happens next</div>
              <div className="mt-2 space-y-2 text-muted-foreground">
                <div className="flex gap-2">
                  <div className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <p className="leading-relaxed">
                    Add the invite to your calendar and join from the meeting
                    link.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  <p className="leading-relaxed">
                    Come prepared with your goals, timelines, and any links you
                    can share.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground">
              If you don’t see the email, check spam/promotions — or book again.
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/onboarding/book-a-call">Book another time</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="gradient">
              <Link href="/client">Go to dashboard</Link>
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-muted-foreground text-sm">
          Need help before the call? Reply to the confirmation email.
        </p>
      </div>
    </main>
  );
}