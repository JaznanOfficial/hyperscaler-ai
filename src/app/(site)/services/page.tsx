import { ServicesGrid } from "@/components/site/services/services-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketingServices, softwareServices } from "@/data/site-services";

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-fuchsia-600 text-sm uppercase tracking-wide">
          Browse Services
        </p>
        <h1 className="mt-2 font-['Outfit'] font-semibold text-4xl text-slate-900">
          Choose a service and track everything in one dashboard
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Flexible managed services to help marketing and product teams move
          faster.
        </p>
      </div>

      <Tabs className="mt-10" defaultValue="marketing">
        <TabsList className="mx-auto flex w-full max-w-xl rounded-3xl bg-slate-100 p-1">
          <TabsTrigger
            className="flex-1 rounded-2xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900"
            value="marketing"
          >
            Marketing Services
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 rounded-2xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:text-slate-900"
            value="software"
          >
            Software Development Services
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-10" value="marketing">
          <ServicesGrid services={marketingServices} />
        </TabsContent>
        <TabsContent className="mt-10" value="software">
          <ServicesGrid services={softwareServices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
