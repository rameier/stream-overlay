import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { OverlayProvider } from "./context/ApiOverlayContext";
import Overlay from "./components/Overlay";
import Dashboard from "./components/Dashboard";
import "./App.css";

// Wrapper to determine if polling should be enabled based on route
const AppContent: React.FC = () => {
  const location = useLocation();
  const isOverlayPage = location.pathname === "/overlay";

  return (
    <OverlayProvider enablePolling={isOverlayPage} pollingInterval={1000}>
      <div className="App">
        <Routes>
          <Route path="/overlay" element={<Overlay />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </OverlayProvider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
