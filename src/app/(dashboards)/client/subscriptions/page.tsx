import { ClientSubscriptionList } from "@/components/dashboard/client/subscription-list"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ClientSubscriptionsPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-4">
          <div className="max-w-xl">
            <h1
              className="text-3xl font-semibold leading-10"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Subscriptions
              </span>
            </h1>
            <p className="text-base leading-3 text-slate-600">
              Track the status, billing, and lifecycle of your services
            </p>
          </div>
          <Tabs defaultValue="all" className="w-full mt-8">
            <TabsList className="rounded-full lg:px-2 lg:py-2 text-base lg:h-12! bg-white border border-slate-300 cursor-pointer">
              <TabsTrigger value="all" className="rounded-full lg:px-5 lg:py-2 lg:text-lg lg:h-9 data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white cursor-pointer">
                <span>All</span>
                <span className="ml-2 flex h-4 lg:h-6 w-4 lg:w-6 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-semibold text-fuchsia-700">
                  5
                </span>
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-full lg:px-5 lg:py-2 lg:text-lg lg:h-9 data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white cursor-pointer">
                <span>Active</span>
                <span className="ml-2 flex h-4 lg:h-6 w-4 lg:w-6 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-semibold text-fuchsia-700">
                  1
                </span>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="rounded-full lg:px-5 lg:py-2 lg:text-lg lg:h-9 data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white cursor-pointer">
                <span>Cancelled</span>
                <span className="ml-2 flex h-4 lg:h-6 w-4 lg:w-6 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-semibold text-fuchsia-700">
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
              <PaginationPrevious href="#" aria-disabled={true} />
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
  )
}
