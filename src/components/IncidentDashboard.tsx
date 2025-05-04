import React, { useState, lazy, Suspense } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useIncidentStore } from "../store/incidentStore";
import "../styles/IncidentDashboard.scss";
import { strings } from "../constants/strings";
import "../styles/IncidentDashboard.scss";

const IncidentTable = lazy(() => import("./IncidentTable"));
const ReportIncidentModal = lazy(() => import("./ReportIncidentModal"));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const IncidentDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const incidents = useIncidentStore((state) => state.incidents);

  const currentRole = tabValue === 0 ? "USER" : "ADMIN";

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Container maxWidth="lg" className="incident-dashboard">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <Typography variant="h4" component="div" className="dashboard-title">
        {strings.incidentDashboard.title}
      </Typography>

      <Box className="dashboard-content-box">
        <Box className="tabs-container">
          <Tabs
            value={tabValue}
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label={strings.incidentDashboard.roleBasedTabsAriaLabel}
            centered
          >
            <Tab
              label={strings.incidentDashboard.userScreenTab}
              icon={<PersonIcon />}
              iconPosition="top"
              {...a11yProps(0)}
            />
            <Tab
              label={strings.incidentDashboard.adminScreenTab}
              icon={<AdminPanelSettingsIcon />}
              iconPosition="top"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          className="add-incident-button"
        >
          {strings.incidentDashboard.newIncidentButton}
        </Button>

        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          }
        >
          <TabPanel value={tabValue} index={0}>
            <IncidentTable incidents={incidents} userRole="USER" />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <IncidentTable incidents={incidents} userRole="ADMIN" />
          </TabPanel>
        </Suspense>
      </Box>

      <Suspense fallback={null}>
        {modalOpen && (
          <ReportIncidentModal
            open={modalOpen}
            onClose={handleCloseModal}
            userRole={currentRole}
          />
        )}
      </Suspense>
    </Container>
  );
};

export default IncidentDashboard;
