import { ServiceListItem } from "@/components/admin/service-list-item";

export type ServiceItem = {
  id: string;
  name: string;
};

const serviceItems: ServiceItem[] = [
  {
    id: "SRV-401",
    name: "Automation Intelligence Suite",
  },
  {
    id: "SRV-389",
    name: "Telemetry & Risk Mesh",
  },
  {
    id: "SRV-376",
    name: "Revenue Autopilot",
  },
];

export function ServiceList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {serviceItems.map((item) => (
          <ServiceListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
