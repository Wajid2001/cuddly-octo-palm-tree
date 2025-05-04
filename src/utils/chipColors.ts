import { ChipProps } from "@mui/material/Chip";
import { Incident } from "../types/incident";

export const getStatusChipColor = (
  status: Incident["status"],
): ChipProps["color"] => {
  switch (status) {
    case "ACTIVE":
      return "primary";
    case "ASSIGNED":
      return "warning";
    case "RESOLVED":
      return "success";
    default:
      return "default";
  }
};

export const getSeverityChipColor = (
  severity?: Incident["severity"],
): ChipProps["color"] => {
  switch (severity) {
    case "LOW":
      return "info";
    case "MEDIUM":
      return "warning";
    case "HIGH":
      return "error";
    case "CRITICAL":
      return "error";
    default:
      return "default";
  }
};
