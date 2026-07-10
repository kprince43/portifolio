import type { MonitorTheme, KeyboardTheme, DeskMaterial, BackgroundTheme } from "@/types";

interface SwatchOption<T extends string> {
  value: T;
  swatch: string;
}

export const monitorOptions: SwatchOption<MonitorTheme>[] = [
  { value: "Dark", swatch: "#3a4148" },
  { value: "Light", swatch: "#e7e9e4" },
  { value: "Cyber", swatch: "#19e6c8" },
];

export const keyboardOptions: SwatchOption<KeyboardTheme>[] = [
  { value: "Black", swatch: "#1c1f22" },
  { value: "White", swatch: "#f1efe8" },
  { value: "RGB", swatch: "#19e6c8" }, // rendered as an animated gradient in the UI, this is just a fallback
];

export const deskOptions: SwatchOption<DeskMaterial>[] = [
  { value: "Wood", swatch: "#8a5a34" },
  { value: "Carbon", swatch: "#23262b" },
  { value: "Glass", swatch: "#bcd6e0" },
];

export const backgroundOptions: SwatchOption<BackgroundTheme>[] = [
  { value: "Office", swatch: "#cfc8b8" },
  { value: "Studio", swatch: "#dcdcdc" },
  { value: "Futuristic", swatch: "#0c0f1c" },
];
