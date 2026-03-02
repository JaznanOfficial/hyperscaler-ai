export type ClientServiceStatus = "Approved" | "Pending" | "Cancelled";

export type ClientServiceRequest = {
  id: string;
  serviceId?: string;
  name: string;
  description: string;
  status: ClientServiceStatus;
  assignedEmployees: string[];
  renewal: string;
};

export type ClientDetail = {
  id: string;
  displayId: string;
  name: string;
  email: string;
  subscriptionId: string;
  accountStatus: "Approved" | "Pending" | "Cancelled";
  requestedServices: ClientServiceRequest[];
};

export const employeeDirectory = [
  "Lana Zimmerman",
  "Arjun Patel",
  "Maya Collins",
  "Noah Whitfield",
  "Priya Ramesh",
  "Devon Ellis",
];
