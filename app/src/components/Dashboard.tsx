import React, { useState } from "react";
import { useOverlayData } from "../context/ApiOverlayContext";
import { StreamerDetail } from "../types";
import ThemeApplier from "./shared/ThemeApplier";
import FacecamPanel from "./overlay/FacecamPanel";
import StreamerInfoPanel from "./overlay/StreamerInfoPanel";
import TodoPanel from "./overlay/TodoPanel";
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

  const [newTodo, setNewTodo] = useState({ title: "", status: "" });
  const [newDetail, setNewDetail] = useState({ label: "", value: "" });

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
    value: string
  ) => {
    updateStreamer({ [field]: value });
  };

  const handleThemeChange = (field: keyof typeof data.theme, value: string) => {
    updateTheme({ [field]: value });
  };

  const handleAddTodo = () => {
    if (newTodo.title.trim() && newTodo.status.trim()) {
      addTodo(newTodo);
      setNewTodo({ title: "", status: "" });
    }
  };

  const handleAddDetail = () => {
    if (newDetail.label.trim() && newDetail.value.trim()) {
      const updatedDetails = [...data.streamer.details, newDetail];
      updateStreamer({ details: updatedDetails });
      setNewDetail({ label: "", value: "" });
    }
  };

  const handleRemoveDetail = (index: number) => {
    const updatedDetails = data.streamer.details.filter((_, i) => i !== index);
    updateStreamer({ details: updatedDetails });
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
        <div className="dashboard__header">
          <div>
            <h1>Stream Overlay Dashboard</h1>
            <p className="sync-status">
              ✅ Changes sync automatically between dashboard and overlay
            </p>
          </div>
          <div className="dashboard__nav">
            <button
              onClick={resetToDefaults}
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

        <div className="dashboard__content">
          <div className="dashboard__main">
            <section className="dashboard__section">
            <h2>Color Theme Settings</h2>
            <div
              className="theme-preview"
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${data.theme.accentPrimary}20, ${data.theme.accentSecondary}20)`,
                border: `2px solid ${data.theme.accentPrimary}`,
                color: data.theme.accentSecondary,
              }}
            >
              <strong>Live Preview:</strong> All colors update in real-time
            </div>

            <div className="color-section">
              <h3>Accent Colors</h3>
              <div className="form-group">
                <label htmlFor="accentPrimary">Primary Accent</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="accentPrimary"
                    value={data.theme.accentPrimary}
                    onChange={(e) =>
                      handleThemeChange("accentPrimary", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.accentPrimary}
                    onChange={(e) =>
                      handleThemeChange("accentPrimary", e.target.value)
                    }
                    placeholder="#5c7cfa"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="accentSecondary">Secondary Accent</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="accentSecondary"
                    value={data.theme.accentSecondary}
                    onChange={(e) =>
                      handleThemeChange("accentSecondary", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.accentSecondary}
                    onChange={(e) =>
                      handleThemeChange("accentSecondary", e.target.value)
                    }
                    placeholder="#91a7ff"
                  />
                </div>
              </div>
            </div>

            <div className="color-section">
              <h3>Text Colors</h3>
              <div className="form-group">
                <label htmlFor="textPrimary">Primary Text</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="textPrimary"
                    value={data.theme.textPrimary}
                    onChange={(e) =>
                      handleThemeChange("textPrimary", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.textPrimary}
                    onChange={(e) =>
                      handleThemeChange("textPrimary", e.target.value)
                    }
                    placeholder="#f7f9ff"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="textSecondary">Secondary Text</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="textSecondary"
                    value={data.theme.textSecondary}
                    onChange={(e) =>
                      handleThemeChange("textSecondary", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.textSecondary}
                    onChange={(e) =>
                      handleThemeChange("textSecondary", e.target.value)
                    }
                    placeholder="#c3c9dd"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="textDim">Dimmed Text</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="textDim"
                    value={
                      data.theme.textDim?.includes("rgba")
                        ? "#c3c9dd"
                        : data.theme.textDim || "#c3c9dd"
                    }
                    onChange={(e) =>
                      handleThemeChange("textDim", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.textDim || "rgba(195, 201, 221, 0.65)"}
                    onChange={(e) =>
                      handleThemeChange("textDim", e.target.value)
                    }
                    placeholder="rgba(195, 201, 221, 0.65)"
                  />
                </div>
              </div>
            </div>

            <div className="color-section">
              <h3>Panel Colors</h3>
              <div className="form-group">
                <label htmlFor="panelSurface">Panel Background</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="panelSurface"
                    value={
                      data.theme.panelSurface?.includes("rgba")
                        ? "#060c1c"
                        : data.theme.panelSurface || "#060c1c"
                    }
                    onChange={(e) =>
                      handleThemeChange("panelSurface", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.panelSurface || "rgba(6, 12, 28, 0.92)"}
                    onChange={(e) =>
                      handleThemeChange("panelSurface", e.target.value)
                    }
                    placeholder="rgba(6, 12, 28, 0.92)"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="panelBorder">Panel Border</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="panelBorder"
                    value={
                      data.theme.panelBorder?.includes("rgba")
                        ? "#91a7ff"
                        : data.theme.panelBorder || "#91a7ff"
                    }
                    onChange={(e) =>
                      handleThemeChange("panelBorder", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.panelBorder || "rgba(145, 167, 255, 0.2)"}
                    onChange={(e) =>
                      handleThemeChange("panelBorder", e.target.value)
                    }
                    placeholder="rgba(145, 167, 255, 0.2)"
                  />
                </div>
              </div>
            </div>

            <div className="color-section">
              <h3>Background Colors</h3>
              <div className="form-group">
                <label htmlFor="detailBackground">
                  Detail Items Background
                </label>
                <div className="color-input">
                  <input
                    type="color"
                    id="detailBackground"
                    value={
                      data.theme.detailBackground?.includes("rgba")
                        ? "#0c1222"
                        : data.theme.detailBackground || "#0c1222"
                    }
                    onChange={(e) =>
                      handleThemeChange("detailBackground", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={
                      data.theme.detailBackground || "rgba(12, 18, 34, 0.7)"
                    }
                    onChange={(e) =>
                      handleThemeChange("detailBackground", e.target.value)
                    }
                    placeholder="rgba(12, 18, 34, 0.7)"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="todoBackground">Todo Items Background</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="todoBackground"
                    value={
                      data.theme.todoBackground?.includes("rgba")
                        ? "#0c1222"
                        : data.theme.todoBackground || "#0c1222"
                    }
                    onChange={(e) =>
                      handleThemeChange("todoBackground", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={
                      data.theme.todoBackground || "rgba(12, 18, 34, 0.78)"
                    }
                    onChange={(e) =>
                      handleThemeChange("todoBackground", e.target.value)
                    }
                    placeholder="rgba(12, 18, 34, 0.78)"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="facecamBackground">Facecam Background</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="facecamBackground"
                    value={
                      data.theme.facecamBackground?.includes("rgba")
                        ? "#080c1a"
                        : data.theme.facecamBackground || "#080c1a"
                    }
                    onChange={(e) =>
                      handleThemeChange("facecamBackground", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={
                      data.theme.facecamBackground || "rgba(8, 12, 26, 0.72)"
                    }
                    onChange={(e) =>
                      handleThemeChange("facecamBackground", e.target.value)
                    }
                    placeholder="rgba(8, 12, 26, 0.72)"
                  />
                </div>
              </div>
            </div>

            <div className="color-section">
              <h3>Effect Colors</h3>
              <div className="form-group">
                <label htmlFor="overlayBorder">Overlay Border</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="overlayBorder"
                    value={
                      data.theme.overlayBorder?.includes("rgba")
                        ? "#5c7cfa"
                        : data.theme.overlayBorder || "#5c7cfa"
                    }
                    onChange={(e) =>
                      handleThemeChange("overlayBorder", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={
                      data.theme.overlayBorder || "rgba(92, 124, 250, 0.35)"
                    }
                    onChange={(e) =>
                      handleThemeChange("overlayBorder", e.target.value)
                    }
                    placeholder="rgba(92, 124, 250, 0.35)"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="panelGlow">Panel Glow</label>
                <div className="color-input">
                  <input
                    type="color"
                    id="panelGlow"
                    value={
                      data.theme.panelGlow?.includes("rgba")
                        ? "#5c7cfa"
                        : data.theme.panelGlow || "#5c7cfa"
                    }
                    onChange={(e) =>
                      handleThemeChange("panelGlow", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={data.theme.panelGlow || "rgba(92, 124, 250, 0.35)"}
                    onChange={(e) =>
                      handleThemeChange("panelGlow", e.target.value)
                    }
                    placeholder="rgba(92, 124, 250, 0.35)"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard__section">
            <h2>Streamer Information</h2>
            <div className="form-group">
              <label htmlFor="streamerName">Name</label>
              <input
                type="text"
                id="streamerName"
                value={data.streamer.name}
                onChange={(e) => handleStreamerChange("name", e.target.value)}
                placeholder="Streamer Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="streamerStatus">Status</label>
              <input
                type="text"
                id="streamerStatus"
                value={data.streamer.status}
                onChange={(e) => handleStreamerChange("status", e.target.value)}
                placeholder="Live aus dem Studio"
              />
            </div>
            <div className="form-group">
              <label htmlFor="streamerTagline">Tagline</label>
              <input
                type="text"
                id="streamerTagline"
                value={data.streamer.tagline}
                onChange={(e) =>
                  handleStreamerChange("tagline", e.target.value)
                }
                placeholder="Creative Dev Streams"
              />
            </div>

            <div className="subsection">
              <h3>Details</h3>
              {data.streamer.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  <input
                    type="text"
                    value={detail.label}
                    onChange={(e) =>
                      handleUpdateDetail(index, "label", e.target.value)
                    }
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) =>
                      handleUpdateDetail(index, "value", e.target.value)
                    }
                    placeholder="Value"
                  />
                  <button
                    onClick={() => handleRemoveDetail(index)}
                    className="btn btn--danger btn--small"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="detail-item">
                <input
                  type="text"
                  value={newDetail.label}
                  onChange={(e) =>
                    setNewDetail({ ...newDetail, label: e.target.value })
                  }
                  placeholder="New Label"
                />
                <input
                  type="text"
                  value={newDetail.value}
                  onChange={(e) =>
                    setNewDetail({ ...newDetail, value: e.target.value })
                  }
                  placeholder="New Value"
                />
                <button
                  onClick={handleAddDetail}
                  className="btn btn--secondary btn--small"
                >
                  Add Detail
                </button>
              </div>
            </div>
          </section>

          <section className="dashboard__section">
            <h2>To-Dos</h2>
            {data.todos.map((todo, index) => (
              <div key={index} className="todo-item">
                <input
                  type="text"
                  value={todo.title}
                  onChange={(e) => updateTodo(index, { title: e.target.value })}
                  placeholder="Todo title"
                />
                <input
                  type="text"
                  value={todo.status}
                  onChange={(e) =>
                    updateTodo(index, { status: e.target.value })
                  }
                  placeholder="Status"
                />
                <button
                  onClick={() => removeTodo(index)}
                  className="btn btn--danger btn--small"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="todo-item">
              <input
                type="text"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                placeholder="New todo title"
              />
              <input
                type="text"
                value={newTodo.status}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, status: e.target.value })
                }
                placeholder="Status"
              />
              <button
                onClick={handleAddTodo}
                className="btn btn--secondary btn--small"
              >
                Add Todo
              </button>
            </div>
          </section>
          </div>

          <div className="dashboard__preview">
            <div className="preview__header">
              <h2>Live Preview</h2>
              <p>See how your overlay panels look in real-time</p>
            </div>
            <div className="preview__panels">
              <FacecamPanel />
              <StreamerInfoPanel />
              <TodoPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
