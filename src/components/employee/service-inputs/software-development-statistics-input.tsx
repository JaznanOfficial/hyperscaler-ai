import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoftwareDevelopmentDailyTeamUpdateCard } from "./software-development-daily-team-update-card";
import { SoftwareDevelopmentDailyUpdateCard } from "./software-development-daily-update-card";
import { SoftwareDevelopmentGeneralCard } from "./software-development-general-card";
import { SoftwareDevelopmentOverallTab } from "./software-development-overall-tab";
import { SoftwareDevelopmentTeamStatusCard } from "./software-development-team-status-card";
import type { ServiceInputProps } from "./types";

export function SoftwareDevelopmentStatisticsInput({
  defaultValues,
  onChange,
}: ServiceInputProps) {
  return (
    <Tabs className="space-y-6" defaultValue="today">
      <TabsList className="w-fit justify-start gap-2">
        <TabsTrigger
          className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          value="today"
        >
          Today
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          value="all"
        >
          Overall
        </TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        <div className="space-y-6">
          <SoftwareDevelopmentGeneralCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentTeamStatusCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentDailyUpdateCard
            defaultValues={defaultValues}
            onChange={onChange}
          />
          <SoftwareDevelopmentDailyTeamUpdateCard
            defaultValues={defaultValues}
            onChange={onChange}
          />

          <div className="flex justify-end">
            <Button className="min-w-35" size="lg" type="button">
              Save metrics
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="all">
        <SoftwareDevelopmentOverallTab
          defaultValues={defaultValues}
          onChange={onChange}
        />
      </TabsContent>
    </Tabs>
  );
}
