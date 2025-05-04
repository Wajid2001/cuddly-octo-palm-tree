import "./App.css";
import IncidentDashboard from "./components/IncidentDashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6558ef",
    },
    secondary: {
      main: "#6558ef",
    },
    text: {
      primary: "#293843",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IncidentDashboard />
    </ThemeProvider>
  );
}

export default App;
