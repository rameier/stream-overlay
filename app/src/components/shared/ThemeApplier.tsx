import { useEffect } from "react";
import { useOverlayData } from "../../context/ApiOverlayContext";

interface ThemeApplierProps {
  isOverlay?: boolean;
}

const ThemeApplier: React.FC<ThemeApplierProps> = ({ isOverlay = false }) => {
  const { data } = useOverlayData();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Set all theme colors with higher specificity
    root.style.setProperty(
      "--accent-primary",
      data.theme.accentPrimary,
      "important"
    );
    root.style.setProperty(
      "--accent-secondary",
      data.theme.accentSecondary,
      "important"
    );
    root.style.setProperty(
      "--panel-surface",
      data.theme.panelSurface,
      "important"
    );
    root.style.setProperty(
      "--panel-border",
      data.theme.panelBorder,
      "important"
    );
    root.style.setProperty(
      "--panel-header-background",
      data.theme.panelHeaderBackground,
      "important"
    );
    root.style.setProperty(
      "--panel-header-border",
      data.theme.panelHeaderBorder,
      "important"
    );
    root.style.setProperty(
      "--panel-title-color",
      data.theme.panelTitleColor,
      "important"
    );
    root.style.setProperty(
      "--text-primary",
      data.theme.textPrimary,
      "important"
    );
    root.style.setProperty(
      "--text-secondary",
      data.theme.textSecondary,
      "important"
    );
    root.style.setProperty("--text-dim", data.theme.textDim, "important");
    root.style.setProperty(
      "--overlay-border",
      data.theme.overlayBorder,
      "important"
    );
    root.style.setProperty("--panel-glow", data.theme.panelGlow, "important");
    root.style.setProperty(
      "--detail-background",
      data.theme.detailBackground,
      "important"
    );
    root.style.setProperty(
      "--todo-background",
      data.theme.todoBackground,
      "important"
    );
    root.style.setProperty(
      "--facecam-background",
      data.theme.facecamBackground,
      "important"
    );
    root.style.setProperty(
      "--shadow-elevated",
      data.theme.shadowElevated,
      "important"
    );

    if (isOverlay) {
      body.setAttribute("data-page", "overlay");
      return () => {
        body.removeAttribute("data-page");
      };
    }
  }, [data.theme, isOverlay]);

  return null; // This component doesn't render anything
};

export default ThemeApplier;
