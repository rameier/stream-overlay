import React from "react";

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
}) => {
  const handleColorChange = (newValue: string) => {
    onChange(newValue);
  };

  // For rgba values, extract a hex approximation for the color picker
  const getColorPickerValue = (colorValue: string) => {
    if (
      colorValue?.includes("rgba") ||
      colorValue?.includes("linear-gradient")
    ) {
      // Extract approximate hex from common rgba patterns and gradients
      const colorMap: { [key: string]: string } = {
        "rgba(255, 255, 255, 0.65)": "#FFFFFF",
        "rgba(33, 44, 53, 0.92)": "#212C35",
        "rgba(242, 64, 64, 0.3)": "#F24040",
        "rgba(124, 13, 13, 0.4)": "#7C0D0D",
        "rgba(31, 33, 36, 0.8)": "#1F2124",
        "rgba(31, 33, 36, 0.85)": "#1F2124",
        "rgba(33, 44, 53, 0.72)": "#212C35",
        "rgba(242, 64, 64, 0.35)": "#F24040",
        "rgba(124, 13, 13, 0.35)": "#7C0D0D",
        "linear-gradient(90deg, rgba(56, 66, 74, 0.18), rgba(56, 66, 74, 0.08))":
          "#38424A",
      };
      return colorMap[colorValue] || "#F24040";
    }
    return colorValue || "#FFFFFF";
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="color-input">
        <input
          type="color"
          id={id}
          value={getColorPickerValue(value)}
          onChange={(e) => handleColorChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

interface ColorSectionProps {
  title: string;
  children: React.ReactNode;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, children }) => {
  return (
    <div className="color-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export { ColorSection, ColorInput };
