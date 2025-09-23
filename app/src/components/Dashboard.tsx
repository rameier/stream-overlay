import React from "react";
import { useOverlayData } from "../context/ApiOverlayContext";
import { StreamerDetail } from "../types";
import ThemeApplier from "./shared/ThemeApplier";
import DashboardHeader from "./dashboard/DashboardHeader";
import ColorThemeSettings from "./dashboard/ColorThemeSettings";
import StreamerInfoSettings from "./dashboard/StreamerInfoSettings";
import TodoSettings from "./dashboard/TodoSettings";
import LivePreview from "./dashboard/LivePreview";
import { TabbedContainer, type Tab } from "./dashboard/TabbedContainer";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  console.log("Dashboard component rendering");
  const {
    data,
    updateStreamer,
    updateTheme,
    addTodo,
    removeTodo,
    updateTodo,
    resetToDefaults,
  } = useOverlayData();

  // Early return if data is not loaded yet
  if (!data || !data.theme || !data.streamer) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#1a202c",
          color: "white",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  const handleStreamerChange = (
    field: keyof typeof data.streamer,
    value: string | StreamerDetail[]
  ) => {
    updateStreamer({ [field]: value });
  };

  const handleThemeChange = (field: keyof typeof data.theme, value: string) => {
    updateTheme({ [field]: value });
  };

  const handleUpdateDetail = (
    index: number,
    field: keyof StreamerDetail,
    value: string
  ) => {
    const updatedDetails = data.streamer.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    updateStreamer({ details: updatedDetails });
  };

  const handleRemoveDetail = (index: number) => {
    const updatedDetails = data.streamer.details.filter((_, i) => i !== index);
    updateStreamer({ details: updatedDetails });
  };

  const handleAddDetail = () => {
    // This function is called by StreamerInfoSettings after it handles the addition
  };

  // Create tabs configuration
  const tabs: Tab[] = [
    {
      id: "theme",
      label: "🎨 Theme",
      content: (
        <ColorThemeSettings
          theme={data.theme}
          onThemeChange={handleThemeChange}
        />
      ),
    },
    {
      id: "streamer",
      label: "👤 Streamer Info",
      content: (
        <StreamerInfoSettings
          streamer={data.streamer}
          onStreamerChange={handleStreamerChange}
          onUpdateDetail={handleUpdateDetail}
          onRemoveDetail={handleRemoveDetail}
          onAddDetail={handleAddDetail}
        />
      ),
    },
    {
      id: "todos",
      label: "✅ To-Dos",
      content: (
        <TodoSettings
          todos={data.todos}
          onUpdateTodo={updateTodo}
          onRemoveTodo={removeTodo}
          onAddTodo={addTodo}
        />
      ),
    },
  ];

  return (
    <>
      <ThemeApplier isOverlay={false} />
      <div
        className="dashboard"
        style={{
          backgroundColor: "#1a202c",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <DashboardHeader onResetToDefaults={resetToDefaults} />

        <div className="dashboard__content">
          <div className="dashboard__main">
            <TabbedContainer tabs={tabs} defaultTab="theme" />
          </div>

          <LivePreview />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
