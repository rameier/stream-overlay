const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "overlay-data.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../app/build")));

// Default overlay data
const defaultData = {
  theme: {
    accentPrimary: "#5c7cfa",
    accentSecondary: "#91a7ff",
    panelSurface: "rgba(6, 12, 28, 0.92)",
    panelBorder: "rgba(145, 167, 255, 0.2)",
    textPrimary: "#f7f9ff",
    textSecondary: "#c3c9dd",
    textDim: "rgba(195, 201, 221, 0.65)",
    overlayBorder: "rgba(92, 124, 250, 0.35)",
    panelGlow: "rgba(92, 124, 250, 0.35)",
    detailBackground: "rgba(12, 18, 34, 0.7)",
    todoBackground: "rgba(12, 18, 34, 0.78)",
    facecamBackground: "rgba(8, 12, 26, 0.72)",
    shadowElevated: "0 24px 48px -28px rgba(12, 20, 46, 0.8)",
  },
  streamer: {
    name: "livieso",
    status: "Live aus dem Studio",
    tagline: "Creative Dev Streams",
    details: [
      { label: "Sprache", value: "Deutsch & Englisch" },
      { label: "Aktuelles Projekt", value: "Overlay Refresh" },
    ],
  },
  todos: [
    { title: "Dashboard API verfeinern", status: "In Arbeit" },
    { title: "Chat Alerts testen", status: "Ausstehend" },
  ],
};

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    // File doesn't exist, create it with default data
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    console.log("Created overlay-data.json with default data");
  }
}

// Read overlay data
async function readOverlayData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading overlay data:", error);
    return defaultData;
  }
}

// Write overlay data
async function writeOverlayData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing overlay data:", error);
    return false;
  }
}

// API Routes

// Get overlay data
app.get("/api/overlay-data", async (req, res) => {
  try {
    const data = await readOverlayData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read overlay data" });
  }
});

// Update overlay data
app.post("/api/overlay-data", async (req, res) => {
  try {
    const newData = req.body;
    const success = await writeOverlayData(newData);

    if (success) {
      res.json({ success: true, message: "Overlay data updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to write overlay data" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid data format" });
  }
});

// Update specific theme properties
app.patch("/api/overlay-data/theme", async (req, res) => {
  try {
    const currentData = await readOverlayData();
    const themeUpdates = req.body;

    currentData.theme = { ...currentData.theme, ...themeUpdates };

    const success = await writeOverlayData(currentData);

    if (success) {
      res.json({ success: true, message: "Theme updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update theme" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid theme data" });
  }
});

// Update streamer info
app.patch("/api/overlay-data/streamer", async (req, res) => {
  try {
    const currentData = await readOverlayData();
    const streamerUpdates = req.body;

    currentData.streamer = { ...currentData.streamer, ...streamerUpdates };

    const success = await writeOverlayData(currentData);

    if (success) {
      res.json({
        success: true,
        message: "Streamer info updated successfully",
      });
    } else {
      res.status(500).json({ error: "Failed to update streamer info" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid streamer data" });
  }
});

// Update todos
app.patch("/api/overlay-data/todos", async (req, res) => {
  try {
    const currentData = await readOverlayData();
    const todosUpdates = req.body;

    currentData.todos = todosUpdates;

    const success = await writeOverlayData(currentData);

    if (success) {
      res.json({ success: true, message: "Todos updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update todos" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid todos data" });
  }
});

// Reset to defaults
app.post("/api/overlay-data/reset", async (req, res) => {
  try {
    const success = await writeOverlayData(defaultData);

    if (success) {
      res.json({ success: true, message: "Reset to defaults successfully" });
    } else {
      res.status(500).json({ error: "Failed to reset data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to reset data" });
  }
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/build/index.html"));
});

// Start server
async function startServer() {
  await initializeDataFile();

  app.listen(PORT, () => {
    console.log(`🚀 Stream Overlay Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`🎬 Overlay: http://localhost:${PORT}/overlay`);
    console.log(`📡 API: http://localhost:${PORT}/api/overlay-data`);
  });
}

startServer().catch(console.error);
