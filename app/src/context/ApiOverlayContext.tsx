import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { OverlayData } from "../types";

const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const defaultData: OverlayData = {
  theme: {
    accentPrimary: "#F24040",
    accentSecondary: "#7C0D0D",
    panelSurface: "rgba(33, 44, 53, 0.92)",
    panelBorder: "rgba(242, 64, 64, 0.3)",
    panelHeaderBackground: "rgba(56, 66, 74, 0.85)",
    panelHeaderBorder: "rgba(124, 13, 13, 0.4)",
    panelTitleColor: "#F24040",
    textPrimary: "#FFFFFF",
    textSecondary: "#F24040",
    textDim: "rgba(255, 255, 255, 0.65)",
    overlayBorder: "rgba(242, 64, 64, 0.35)",
    panelGlow: "rgba(124, 13, 13, 0.35)",
    detailBackground: "rgba(31, 33, 36, 0.8)",
    todoBackground: "rgba(31, 33, 36, 0.85)",
    facecamBackground: "rgba(33, 44, 53, 0.72)",
    shadowElevated: "0 24px 48px -28px rgba(31, 33, 36, 0.8)",
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

interface OverlayContextType {
  data: OverlayData;
  isLoading: boolean;
  error: string | null;
  updateData: (newData: OverlayData) => Promise<void>;
  updateStreamer: (partial: Partial<OverlayData["streamer"]>) => Promise<void>;
  updateTheme: (partial: Partial<OverlayData["theme"]>) => Promise<void>;
  addTodo: (todo: Omit<OverlayData["todos"][0], "id">) => Promise<void>;
  removeTodo: (index: number) => Promise<void>;
  updateTodo: (
    index: number,
    todo: Partial<OverlayData["todos"][0]>
  ) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlayData = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlayData must be used within an OverlayProvider");
  }
  return context;
};

// API functions
async function fetchOverlayData(): Promise<OverlayData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching overlay data:", error);
    return defaultData;
  }
}

async function updateOverlayData(data: OverlayData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating overlay data:", error);
    return false;
  }
}

async function updateThemeData(
  theme: Partial<OverlayData["theme"]>
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data/theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theme),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating theme data:", error);
    return false;
  }
}

async function updateStreamerData(
  streamer: Partial<OverlayData["streamer"]>
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data/streamer`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(streamer),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating streamer data:", error);
    return false;
  }
}

async function updateTodosData(todos: OverlayData["todos"]): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data/todos`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating todos data:", error);
    return false;
  }
}

async function resetData(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overlay-data/reset`, {
      method: "POST",
    });
    return response.ok;
  } catch (error) {
    console.error("Error resetting data:", error);
    return false;
  }
}

interface OverlayProviderProps {
  children: ReactNode;
  enablePolling?: boolean;
  pollingInterval?: number;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
  enablePolling = false,
  pollingInterval = 2000, // 2 seconds
}) => {
  const [data, setData] = useState<OverlayData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const refreshData = useCallback(async () => {
    try {
      setError(null);
      const newData = await fetchOverlayData();
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Polling for overlay page (real-time updates)
  useEffect(() => {
    if (!enablePolling) return;

    const interval = setInterval(refreshData, pollingInterval);
    return () => clearInterval(interval);
  }, [enablePolling, pollingInterval, refreshData]);

  const updateData = useCallback(async (newData: OverlayData) => {
    const success = await updateOverlayData(newData);
    if (success) {
      setData(newData);
    } else {
      setError("Failed to update data");
    }
  }, []);

  const updateStreamer = useCallback(
    async (partial: Partial<OverlayData["streamer"]>) => {
      const success = await updateStreamerData(partial);
      if (success) {
        setData((prev) => ({
          ...prev,
          streamer: { ...prev.streamer, ...partial },
        }));
      } else {
        setError("Failed to update streamer data");
      }
    },
    []
  );

  const updateTheme = useCallback(
    async (partial: Partial<OverlayData["theme"]>) => {
      const success = await updateThemeData(partial);
      if (success) {
        setData((prev) => ({
          ...prev,
          theme: { ...prev.theme, ...partial },
        }));
      } else {
        setError("Failed to update theme");
      }
    },
    []
  );

  const addTodo = useCallback(
    async (todo: Omit<OverlayData["todos"][0], "id">) => {
      const newTodos = [...data.todos, todo];
      const success = await updateTodosData(newTodos);
      if (success) {
        setData((prev) => ({
          ...prev,
          todos: newTodos,
        }));
      } else {
        setError("Failed to add todo");
      }
    },
    [data.todos]
  );

  const removeTodo = useCallback(
    async (index: number) => {
      const newTodos = data.todos.filter((_, i) => i !== index);
      const success = await updateTodosData(newTodos);
      if (success) {
        setData((prev) => ({
          ...prev,
          todos: newTodos,
        }));
      } else {
        setError("Failed to remove todo");
      }
    },
    [data.todos]
  );

  const updateTodo = useCallback(
    async (index: number, todo: Partial<OverlayData["todos"][0]>) => {
      const newTodos = data.todos.map((t, i) =>
        i === index ? { ...t, ...todo } : t
      );
      const success = await updateTodosData(newTodos);
      if (success) {
        setData((prev) => ({
          ...prev,
          todos: newTodos,
        }));
      } else {
        setError("Failed to update todo");
      }
    },
    [data.todos]
  );

  const resetToDefaults = useCallback(async () => {
    const success = await resetData();
    if (success) {
      await refreshData(); // Fetch fresh data after reset
    } else {
      setError("Failed to reset to defaults");
    }
  }, [refreshData]);

  const value: OverlayContextType = {
    data,
    isLoading,
    error,
    updateData,
    updateStreamer,
    updateTheme,
    addTodo,
    removeTodo,
    updateTodo,
    resetToDefaults,
    refreshData,
  };

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
