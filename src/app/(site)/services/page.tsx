import { ServicesGrid } from "@/components/site/services/services-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketingServices, softwareServices } from "@/data/site-services";

export default function ServicesPage() {
  return (
    <div className="mx-auto w-11/12 py-12 lg:w-10/12">
      <div className="text-center">
        <h1 className="mt-2 font-['Outfit'] font-semibold text-4xl text-slate-900">
          Browse Services
        </h1>
        <p className="mt-5 font-normal text-slate-700 text-xl leading-7">
          Choose a service and track everything in one dashboard
        </p>
      </div>

      <Tabs className="mt-10" defaultValue="marketing">
        <TabsList className="cursor-pointer rounded-full border border-slate-300 bg-white text-base lg:mx-auto lg:h-12! lg:px-2 lg:py-2">
          <TabsTrigger
            className="cursor-pointer rounded-full font-normal text-black text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="marketing"
          >
            Scale
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer rounded-full font-normal text-black text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="software"
          >
            Build
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-10" value="marketing">
          <ServicesGrid
            ctaType="talk"
            services={marketingServices}
            talkButtonLabel="Talk to our growth experts"
          />
        </TabsContent>
        <TabsContent className="mt-10" value="software">
          <ServicesGrid
            ctaType="talk"
            services={softwareServices}
            talkButtonLabel="Talk to our developers"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
