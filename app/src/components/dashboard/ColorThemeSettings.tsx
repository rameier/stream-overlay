import React from "react";
import { ColorSection, ColorInput } from "./ColorSection";

interface Theme {
  accentPrimary: string;
  accentSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textDim?: string;
  panelSurface?: string;
  panelBorder?: string;
  panelHeaderBackground?: string;
  panelHeaderBorder?: string;
  panelTitleColor?: string;
  detailBackground?: string;
  todoBackground?: string;
  facecamBackground?: string;
  overlayBorder?: string;
  panelGlow?: string;
}

interface ColorThemeSettingsProps {
  theme: Theme;
  onThemeChange: (field: keyof Theme, value: string) => void;
}

const ColorThemeSettings: React.FC<ColorThemeSettingsProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <>
      <div className="settings-header">
        <h2>Color Theme Settings</h2>
        <span className="settings-count">15 color settings</span>
      </div>
      
      <div className="color-settings-grid">
        <ColorSection title="Accent Colors">
          <ColorInput
            id="accentPrimary"
            label="Primary Accent"
            value={theme.accentPrimary}
            placeholder="#5c7cfa"
            onChange={(value) => onThemeChange("accentPrimary", value)}
          />
          <ColorInput
            id="accentSecondary"
            label="Secondary Accent"
            value={theme.accentSecondary}
            placeholder="#91a7ff"
            onChange={(value) => onThemeChange("accentSecondary", value)}
          />
        </ColorSection>

        <ColorSection title="Text Colors">
          <ColorInput
            id="textPrimary"
            label="Primary Text"
            value={theme.textPrimary}
            placeholder="#f7f9ff"
            onChange={(value) => onThemeChange("textPrimary", value)}
          />
          <ColorInput
            id="textSecondary"
            label="Secondary Text"
            value={theme.textSecondary}
            placeholder="#c3c9dd"
            onChange={(value) => onThemeChange("textSecondary", value)}
          />
          <ColorInput
            id="textDim"
            label="Dimmed Text"
            value={theme.textDim || "rgba(195, 201, 221, 0.65)"}
            placeholder="rgba(195, 201, 221, 0.65)"
            onChange={(value) => onThemeChange("textDim", value)}
          />
        </ColorSection>

        <ColorSection title="Panel Colors">
          <ColorInput
            id="panelSurface"
            label="Panel Background"
            value={theme.panelSurface || "rgba(6, 12, 28, 0.92)"}
            placeholder="rgba(6, 12, 28, 0.92)"
            onChange={(value) => onThemeChange("panelSurface", value)}
          />
          <ColorInput
            id="panelBorder"
            label="Panel Border"
            value={theme.panelBorder || "rgba(145, 167, 255, 0.2)"}
            placeholder="rgba(145, 167, 255, 0.2)"
            onChange={(value) => onThemeChange("panelBorder", value)}
          />
          <ColorInput
            id="panelHeaderBackground"
            label="Header Background"
            value={theme.panelHeaderBackground || "linear-gradient(90deg, rgba(92, 124, 250, 0.18), rgba(92, 124, 250, 0.08))"}
            placeholder="linear-gradient(90deg, rgba(92, 124, 250, 0.18), rgba(92, 124, 250, 0.08))"
            onChange={(value) => onThemeChange("panelHeaderBackground", value)}
          />
          <ColorInput
            id="panelHeaderBorder"
            label="Header Bottom Border"
            value={theme.panelHeaderBorder || "rgba(145, 167, 255, 0.14)"}
            placeholder="rgba(145, 167, 255, 0.14)"
            onChange={(value) => onThemeChange("panelHeaderBorder", value)}
          />
          <ColorInput
            id="panelTitleColor"
            label="Panel Title Text"
            value={theme.panelTitleColor || "#c3c9dd"}
            placeholder="#c3c9dd"
            onChange={(value) => onThemeChange("panelTitleColor", value)}
          />
        </ColorSection>

        <ColorSection title="Background Colors">
          <ColorInput
            id="detailBackground"
            label="Detail Items Background"
            value={theme.detailBackground || "rgba(12, 18, 34, 0.7)"}
            placeholder="rgba(12, 18, 34, 0.7)"
            onChange={(value) => onThemeChange("detailBackground", value)}
          />
          <ColorInput
            id="todoBackground"
            label="Todo Items Background"
            value={theme.todoBackground || "rgba(12, 18, 34, 0.78)"}
            placeholder="rgba(12, 18, 34, 0.78)"
            onChange={(value) => onThemeChange("todoBackground", value)}
          />
          <ColorInput
            id="facecamBackground"
            label="Facecam Background"
            value={theme.facecamBackground || "rgba(8, 12, 26, 0.72)"}
            placeholder="rgba(8, 12, 26, 0.72)"
            onChange={(value) => onThemeChange("facecamBackground", value)}
          />
        </ColorSection>

        <ColorSection title="Effect Colors">
          <ColorInput
            id="overlayBorder"
            label="Overlay Border"
            value={theme.overlayBorder || "rgba(92, 124, 250, 0.35)"}
            placeholder="rgba(92, 124, 250, 0.35)"
            onChange={(value) => onThemeChange("overlayBorder", value)}
          />
          <ColorInput
            id="panelGlow"
            label="Panel Glow"
            value={theme.panelGlow || "rgba(92, 124, 250, 0.35)"}
            placeholder="rgba(92, 124, 250, 0.35)"
            onChange={(value) => onThemeChange("panelGlow", value)}
          />
        </ColorSection>
      </div>
    </>
  );
};

export default ColorThemeSettings;