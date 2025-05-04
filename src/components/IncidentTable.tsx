import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";
import { Incident } from "../types/incident";
import "../styles/IncidentTable.scss";
import { strings } from "../constants/strings";
import { getStatusChipColor, getSeverityChipColor } from "../utils/chipColors";

interface IncidentTableProps {
  incidents: Incident[];
  userRole: "USER" | "ADMIN";
}

const IncidentTable: React.FC<IncidentTableProps> = ({
  incidents,
  userRole,
}) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} className="incident-table">
      <Table aria-label={strings.incidentTable.ariaLabel}>
        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell sx={{ color: theme.palette.primary.contrastText }}>
              {strings.incidentTable.idHeader}
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText }}>
              {strings.incidentTable.titleHeader}
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText }}>
              {strings.incidentTable.descriptionHeader}
            </TableCell>
            {userRole === "ADMIN" && (
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                {strings.incidentTable.severityHeader}
              </TableCell>
            )}
            {userRole === "ADMIN" && (
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                {strings.incidentTable.createdDateHeader}
              </TableCell>
            )}
            <TableCell sx={{ color: theme.palette.primary.contrastText }}>
              {strings.incidentTable.lastUpdatedDateHeader}
            </TableCell>
            <TableCell sx={{ color: theme.palette.primary.contrastText }}>
              {strings.incidentTable.statusHeader}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id} className="incident-table-row">
              <TableCell component="th" scope="row">
                {incident.id}
              </TableCell>
              <TableCell>{incident.title}</TableCell>
              <TableCell>{incident.description}</TableCell>
              {userRole === "ADMIN" && (
                <TableCell>
                  {incident.severity ? (
                    <Chip
                      label={incident.severity}
                      color={getSeverityChipColor(incident.severity)}
                      size="small"
                    />
                  ) : (
                    strings.incidentTable.noSeverity
                  )}
                </TableCell>
              )}
              {userRole === "ADMIN" && (
                <TableCell>
                  {incident.createdDate || strings.incidentTable.noCreatedDate}
                </TableCell>
              )}
              <TableCell>{incident.lastUpdatedDate}</TableCell>
              <TableCell>
                <Chip
                  label={incident.status}
                  color={getStatusChipColor(incident.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncidentTable;
