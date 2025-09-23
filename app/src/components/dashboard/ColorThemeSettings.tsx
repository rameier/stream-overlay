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
            placeholder="#F24040"
            onChange={(value) => onThemeChange("accentPrimary", value)}
          />
          <ColorInput
            id="accentSecondary"
            label="Secondary Accent"
            value={theme.accentSecondary}
            placeholder="#7C0D0D"
            onChange={(value) => onThemeChange("accentSecondary", value)}
          />
        </ColorSection>

        <ColorSection title="Text Colors">
          <ColorInput
            id="textPrimary"
            label="Primary Text"
            value={theme.textPrimary}
            placeholder="#FFFFFF"
            onChange={(value) => onThemeChange("textPrimary", value)}
          />
          <ColorInput
            id="textSecondary"
            label="Secondary Text"
            value={theme.textSecondary}
            placeholder="#F24040"
            onChange={(value) => onThemeChange("textSecondary", value)}
          />
          <ColorInput
            id="textDim"
            label="Dimmed Text"
            value={theme.textDim || "rgba(255, 255, 255, 0.65)"}
            placeholder="rgba(255, 255, 255, 0.65)"
            onChange={(value) => onThemeChange("textDim", value)}
          />
        </ColorSection>

        <ColorSection title="Panel Colors">
          <ColorInput
            id="panelSurface"
            label="Panel Background"
            value={theme.panelSurface || "rgba(33, 44, 53, 0.92)"}
            placeholder="rgba(33, 44, 53, 0.92)"
            onChange={(value) => onThemeChange("panelSurface", value)}
          />
          <ColorInput
            id="panelBorder"
            label="Panel Border"
            value={theme.panelBorder || "rgba(242, 64, 64, 0.3)"}
            placeholder="rgba(242, 64, 64, 0.3)"
            onChange={(value) => onThemeChange("panelBorder", value)}
          />
          <ColorInput
            id="panelHeaderBackground"
            label="Header Background"
            value={
              theme.panelHeaderBackground ||
              "linear-gradient(90deg, rgba(56, 66, 74, 0.18), rgba(56, 66, 74, 0.08))"
            }
            placeholder="linear-gradient(90deg, rgba(56, 66, 74, 0.18), rgba(56, 66, 74, 0.08))"
            onChange={(value) => onThemeChange("panelHeaderBackground", value)}
          />
          <ColorInput
            id="panelHeaderBorder"
            label="Header Bottom Border"
            value={theme.panelHeaderBorder || "rgba(124, 13, 13, 0.4)"}
            placeholder="rgba(124, 13, 13, 0.4)"
            onChange={(value) => onThemeChange("panelHeaderBorder", value)}
          />
          <ColorInput
            id="panelTitleColor"
            label="Panel Title Text"
            value={theme.panelTitleColor || "#F24040"}
            placeholder="#F24040"
            onChange={(value) => onThemeChange("panelTitleColor", value)}
          />
        </ColorSection>

        <ColorSection title="Background Colors">
          <ColorInput
            id="detailBackground"
            label="Detail Items Background"
            value={theme.detailBackground || "rgba(31, 33, 36, 0.8)"}
            placeholder="rgba(31, 33, 36, 0.8)"
            onChange={(value) => onThemeChange("detailBackground", value)}
          />
          <ColorInput
            id="todoBackground"
            label="Todo Items Background"
            value={theme.todoBackground || "rgba(31, 33, 36, 0.85)"}
            placeholder="rgba(31, 33, 36, 0.85)"
            onChange={(value) => onThemeChange("todoBackground", value)}
          />
          <ColorInput
            id="facecamBackground"
            label="Facecam Background"
            value={theme.facecamBackground || "rgba(33, 44, 53, 0.72)"}
            placeholder="rgba(33, 44, 53, 0.72)"
            onChange={(value) => onThemeChange("facecamBackground", value)}
          />
        </ColorSection>

        <ColorSection title="Effect Colors">
          <ColorInput
            id="overlayBorder"
            label="Overlay Border"
            value={theme.overlayBorder || "rgba(242, 64, 64, 0.35)"}
            placeholder="rgba(242, 64, 64, 0.35)"
            onChange={(value) => onThemeChange("overlayBorder", value)}
          />
          <ColorInput
            id="panelGlow"
            label="Panel Glow"
            value={theme.panelGlow || "rgba(124, 13, 13, 0.35)"}
            placeholder="rgba(124, 13, 13, 0.35)"
            onChange={(value) => onThemeChange("panelGlow", value)}
          />
        </ColorSection>
      </div>
    </>
  );
};

export default ColorThemeSettings;
