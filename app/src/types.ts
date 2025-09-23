export interface Theme {
  // Accent colors
  accentPrimary: string;
  accentSecondary: string;

  // Panel colors
  panelSurface: string;
  panelBorder: string;
  panelHeaderBackground: string;
  panelHeaderBorder: string;
  panelTitleColor: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textDim: string;

  // Background colors
  overlayBorder: string;
  panelGlow: string;

  // Surface colors
  detailBackground: string;
  todoBackground: string;
  facecamBackground: string;

  // Shadow
  shadowElevated: string;
}

export interface StreamerDetail {
  label: string;
  value: string;
}

export interface StreamerInfo {
  name: string;
  status: string;
  tagline: string;
  details: StreamerDetail[];
}

export interface Todo {
  title: string;
  status: string;
  assignee?: string;
  due?: string;
}

export interface OverlayData {
  theme: Theme;
  streamer: StreamerInfo;
  todos: Todo[];
}
