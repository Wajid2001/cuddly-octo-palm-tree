import { create } from "zustand";
import { Incident, IncidentStatus, IncidentSeverity } from "../types/incident";

interface IncidentState {
  incidents: Incident[];
  addIncident: (
    incidentData: Omit<
      Incident,
      "id" | "lastUpdatedDate" | "status" | "createdDate"
    >,
    role: "USER" | "ADMIN",
  ) => void;
}

const getRandomStatus = (): IncidentStatus => {
  const statuses: IncidentStatus[] = ["ACTIVE", "ASSIGNED", "RESOLVED"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const initialIncidents: Incident[] = [
  {
    id: "INC-001",
    title: "Server down",
    description: "The main server went temporarily down",
    lastUpdatedDate: new Date("2025-05-01T22:15:00").toLocaleString(),
    status: "ACTIVE",
  },
  {
    id: "INC-002",
    title: "Login issue",
    description: "Users reporting issues logging into the application",
    lastUpdatedDate: new Date("2025-05-02T12:30:00").toLocaleString(),
    status: "ASSIGNED",
    severity: "HIGH",
    createdDate: new Date("2025-05-02T11:00:00").toLocaleString(),
  },
  {
    id: "INC-003",
    title: "UI Glitch",
    description: "Minor visual bug on the dashboard page",
    lastUpdatedDate: new Date("2025-05-03T09:00:00").toLocaleString(),
    status: "RESOLVED",
    severity: "LOW",
    createdDate: new Date("2025-05-03T08:30:00").toLocaleString(),
  },
];

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: initialIncidents,
  addIncident: (incidentData, role) =>
    set((state) => {
      const now = new Date();
      const newIncident: Incident = {
        ...incidentData,
        id: `INC-${String(state.incidents.length + 1).padStart(3, "0")}`,

        lastUpdatedDate: now.toLocaleString(),
        status: getRandomStatus(),

        ...(role === "ADMIN" && {
          createdDate: now.toLocaleString(),
          severity: incidentData.severity as IncidentSeverity,
        }),
      };

      return { incidents: [...state.incidents, newIncident] };
    }),
}));
