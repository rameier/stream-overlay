import React from "react";

interface DashboardHeaderProps {
  onResetToDefaults: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onResetToDefaults,
}) => {
  return (
    <div className="dashboard__header">
      <div>
        <h1>Stream Overlay Dashboard</h1>
        <p className="sync-status">
          ✅ Changes sync automatically between dashboard and overlay
        </p>
      </div>
      <div className="dashboard__nav">
        <button
          onClick={onResetToDefaults}
          className="btn btn--secondary"
          style={{ marginRight: "1rem" }}
        >
          Reset to Defaults
        </button>
        <a href="/overlay" target="_blank" className="btn btn--primary">
          Open Overlay
        </a>
      </div>
    </div>
  );
};

export default DashboardHeader;