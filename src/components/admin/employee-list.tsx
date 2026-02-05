import { EmployeeListItem } from "@/components/admin/employee-list-item";

export type EmployeeItem = {
  id: string;
  name: string;
  email: string;
  title: string;
  expertise: string;
  yearsExperience: number;
  roleLevel: "manager" | "employee";
};

const employeeItems: EmployeeItem[] = [
  {
    id: "EMP-2093",
    name: "Lana Zimmerman",
    email: "lana@hyperscaler.io",
    title: "Product Lead",
    expertise: "Revenue playbooks, demand gen, GTM automation",
    yearsExperience: 9,
    roleLevel: "manager",
  },
  {
    id: "EMP-1988",
    name: "Arjun Patel",
    email: "arjun@hyperscaler.io",
    title: "Automation Architect",
    expertise: "Workflow orchestration, AI integrations, RevOps infra",
    yearsExperience: 7,
    roleLevel: "employee",
  },
  {
    id: "EMP-1842",
    name: "Maya Collins",
    email: "maya@hyperscaler.io",
    title: "Solutions Engineer",
    expertise: "Client onboarding, telemetry, experimentation",
    yearsExperience: 5,
    roleLevel: "employee",
  },
];

export function EmployeeList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {employeeItems.map((item) => (
          <EmployeeListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
