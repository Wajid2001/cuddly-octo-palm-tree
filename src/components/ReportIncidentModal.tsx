import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import DynamicForm from "./DynamicForm";
import { reportIncidentFormConfig } from "../config/formConfig";
import { useIncidentStore } from "../store/incidentStore";
import { Incident, IncidentSeverity } from "../types/incident";
import { strings } from "../constants/strings";
import "../styles/ReportIncidentModal.scss";

interface ReportIncidentModalProps {
  open: boolean;
  onClose: () => void;
  userRole: "USER" | "ADMIN";
}

type FormData = Omit<
  Incident,
  "id" | "lastUpdatedDate" | "status" | "createdDate"
>;

const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  open,
  onClose,
  userRole,
}) => {
  const addIncident = useIncidentStore((state) => state.addIncident);

  const handleSubmit = (data: Record<string, string>) => {
    const incidentToAdd: FormData = {
      title: data.title,
      description: data.description,
      ...(data.severity && { severity: data.severity as IncidentSeverity }),
    };
    addIncident(incidentToAdd, userRole);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="report-incident-modal-title"
      aria-describedby="report-incident-modal-description"
    >
      <Box className="report-incident-modal">
        <Typography
          id="report-incident-modal-title"
          variant="h6"
          component="h2"
        >
          {userRole === "ADMIN"
            ? strings.reportIncidentModal.titleAdmin
            : strings.reportIncidentModal.titleUser}
        </Typography>
        <DynamicForm
          config={reportIncidentFormConfig}
          onSubmit={handleSubmit}
          onCancel={onClose}
          userRole={userRole}
        />
      </Box>
    </Modal>
  );
};

export default ReportIncidentModal;
