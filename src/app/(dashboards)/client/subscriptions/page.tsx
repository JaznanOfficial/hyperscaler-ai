import { ClientSubscriptionList } from "@/components/dashboard/client/subscription-list";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientSubscriptionsPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-4">
          <div className="max-w-xl">
            <h1
              className="font-semibold text-3xl leading-10"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Subscriptions
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-3">
              Track the status, billing, and lifecycle of your services
            </p>
          </div>
          <Tabs className="mt-8 w-full" defaultValue="all">
            <TabsList className="cursor-pointer rounded-full border border-slate-300 bg-white text-base lg:h-12! lg:px-2 lg:py-2">
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="all"
              >
                <span>All</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  5
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="active"
              >
                <span>Active</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  1
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer rounded-full data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:px-5 lg:py-2 lg:text-lg"
                value="cancelled"
              >
                <span>Cancelled</span>
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-100 font-semibold text-fuchsia-700 text-sm lg:h-6 lg:w-6">
                  1
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ClientSubscriptionList />
        </div>
      </div>

      <div className="flex items-end justify-center pb-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious aria-disabled={true} href="#" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 1}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
