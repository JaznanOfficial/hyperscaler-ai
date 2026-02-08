import { ComponentExample } from "@/components/component-example";
import { HomeNavbar } from "@/components/home/home-navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/20">
      <HomeNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <ComponentExample />
      </main>
    </div>
  );
}
