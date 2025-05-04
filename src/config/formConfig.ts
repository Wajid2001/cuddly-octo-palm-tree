import { FormConfig } from "../types/incident";
import { strings } from "../constants/strings";

export const reportIncidentFormConfig: FormConfig = {
  fields: [
    {
      name: "title",
      label: strings.reportIncidentModal.titleLabel,
      type: "text",
      roles: ["ADMIN", "USER"],
      required: true,
    },
    {
      name: "description",
      label: strings.reportIncidentModal.descriptionLabel,
      type: "textarea",
      roles: ["ADMIN", "USER"],
      required: true,
    },
    {
      name: "severity",
      label: strings.reportIncidentModal.severityLabel,
      type: "select",
      roles: ["ADMIN"],
      required: true,
      options: [
        {
          value: "LOW",
          label: strings.reportIncidentModal.severityOptions.low,
        },
        {
          value: "MEDIUM",
          label: strings.reportIncidentModal.severityOptions.medium,
        },
        {
          value: "HIGH",
          label: strings.reportIncidentModal.severityOptions.high,
        },
        {
          value: "CRITICAL",
          label: strings.reportIncidentModal.severityOptions.critical,
        },
      ],
    },
  ],
};
