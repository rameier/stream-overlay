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
    if (colorValue?.includes("rgba") || colorValue?.includes("linear-gradient")) {
      // Extract approximate hex from common rgba patterns and gradients
      const colorMap: { [key: string]: string } = {
        "rgba(195, 201, 221, 0.65)": "#c3c9dd",
        "rgba(6, 12, 28, 0.92)": "#060c1c",
        "rgba(145, 167, 255, 0.2)": "#91a7ff",
        "rgba(145, 167, 255, 0.14)": "#91a7ff",
        "rgba(12, 18, 34, 0.7)": "#0c1222",
        "rgba(12, 18, 34, 0.78)": "#0c1222",
        "rgba(8, 12, 26, 0.72)": "#080c1a",
        "rgba(92, 124, 250, 0.35)": "#5c7cfa",
        "linear-gradient(90deg, rgba(92, 124, 250, 0.18), rgba(92, 124, 250, 0.08))": "#5c7cfa",
      };
      return colorMap[colorValue] || "#5c7cfa";
    }
    return colorValue || "#c3c9dd";
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