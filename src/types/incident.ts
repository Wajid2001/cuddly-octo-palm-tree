export type IncidentStatus = "ACTIVE" | "ASSIGNED" | "RESOLVED";
export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Incident {
  id: string;
  title: string;
  description: string;
  lastUpdatedDate: string;
  status: IncidentStatus;
  severity?: IncidentSeverity;
  createdDate?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  roles: ("ADMIN" | "USER")[];
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  fields: FormField[];
}
