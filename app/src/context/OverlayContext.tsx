import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { OverlayData } from "../types";

const STORAGE_KEY = "stream-overlay-data";

const defaultData: OverlayData = {
  theme: {
    // Accent colors
    accentPrimary: "#5c7cfa",
    accentSecondary: "#91a7ff",

    // Panel colors
    panelSurface: "rgba(6, 12, 28, 0.92)",
    panelBorder: "rgba(145, 167, 255, 0.2)",
    panelHeaderBackground: "rgba(12, 18, 34, 0.85)",
    panelHeaderBorder: "rgba(92, 124, 250, 0.3)",
    panelTitleColor: "#f7f9ff",

    // Text colors
    textPrimary: "#f7f9ff",
    textSecondary: "#c3c9dd",
    textDim: "rgba(195, 201, 221, 0.65)",

    // Background colors
    overlayBorder: "rgba(92, 124, 250, 0.35)",
    panelGlow: "rgba(92, 124, 250, 0.35)",

    // Surface colors
    detailBackground: "rgba(12, 18, 34, 0.7)",
    todoBackground: "rgba(12, 18, 34, 0.78)",
    facecamBackground: "rgba(8, 12, 26, 0.72)",

    // Shadow
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
    { title: "Overlay deployen", status: "Review" },
  ],
};

// Helper functions for localStorage
const loadDataFromStorage = (): OverlayData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn("Failed to load data from localStorage:", error);
  }
  return defaultData;
};

const saveDataToStorage = (data: OverlayData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom event for cross-tab synchronization
    window.dispatchEvent(
      new CustomEvent("overlay-data-changed", { detail: data })
    );
  } catch (error) {
    console.warn("Failed to save data to localStorage:", error);
  }
};

interface OverlayContextType {
  data: OverlayData;
  updateData: (partial: Partial<OverlayData>) => void;
  updateStreamer: (partial: Partial<OverlayData["streamer"]>) => void;
  updateTheme: (partial: Partial<OverlayData["theme"]>) => void;
  addTodo: (todo: Omit<OverlayData["todos"][0], "id">) => void;
  removeTodo: (index: number) => void;
  updateTodo: (index: number, todo: Partial<OverlayData["todos"][0]>) => void;
  resetToDefaults: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const useOverlayData = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlayData must be used within an OverlayProvider");
  }
  return context;
};

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<OverlayData>(() => loadDataFromStorage());

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  // Listen for storage events and custom events for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          setData({ ...defaultData, ...newData });
        } catch (error) {
          console.warn("Failed to parse storage data:", error);
        }
      }
    };

    const handleCustomEvent = (e: CustomEvent<OverlayData>) => {
      setData(e.detail);
    };

    // Polling fallback for browsers that might not support all events
    const pollForChanges = () => {
      const currentStored = localStorage.getItem(STORAGE_KEY);
      if (currentStored) {
        try {
          const storedData = JSON.parse(currentStored);
          const currentDataString = JSON.stringify(data);
          const storedDataString = JSON.stringify(storedData);

          if (currentDataString !== storedDataString) {
            setData({ ...defaultData, ...storedData });
          }
        } catch (error) {
          // Ignore parsing errors
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("overlay-data-changed" as any, handleCustomEvent);

    // Poll every 1 second as fallback
    const pollInterval = setInterval(pollForChanges, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "overlay-data-changed" as any,
        handleCustomEvent
      );
      clearInterval(pollInterval);
    };
  }, [data]);

  const updateData = useCallback((partial: Partial<OverlayData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const updateStreamer = useCallback(
    (partial: Partial<OverlayData["streamer"]>) => {
      setData((prev) => ({
        ...prev,
        streamer: { ...prev.streamer, ...partial },
      }));
    },
    []
  );

  const updateTheme = useCallback((partial: Partial<OverlayData["theme"]>) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...partial },
    }));
  }, []);

  const addTodo = useCallback((todo: Omit<OverlayData["todos"][0], "id">) => {
    setData((prev) => ({
      ...prev,
      todos: [...prev.todos, todo],
    }));
  }, []);

  const removeTodo = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      todos: prev.todos.filter((_, i) => i !== index),
    }));
  }, []);

  const updateTodo = useCallback(
    (index: number, todo: Partial<OverlayData["todos"][0]>) => {
      setData((prev) => ({
        ...prev,
        todos: prev.todos.map((t, i) => (i === index ? { ...t, ...todo } : t)),
      }));
    },
    []
  );

  const resetToDefaults = useCallback(() => {
    setData(defaultData);
  }, []);

  const value: OverlayContextType = {
    data,
    updateData,
    updateStreamer,
    updateTheme,
    addTodo,
    removeTodo,
    updateTodo,
    resetToDefaults,
  };

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};
