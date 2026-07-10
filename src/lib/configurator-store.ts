import { create } from "zustand";
import type { MonitorTheme, KeyboardTheme, DeskMaterial, BackgroundTheme } from "@/types";

interface ConfiguratorState {
  monitor: MonitorTheme;
  keyboard: KeyboardTheme;
  desk: DeskMaterial;
  background: BackgroundTheme;
  setMonitor: (value: MonitorTheme) => void;
  setKeyboard: (value: KeyboardTheme) => void;
  setDesk: (value: DeskMaterial) => void;
  setBackground: (value: BackgroundTheme) => void;
}

/**
 * Single source of truth for the configurator's selections.
 *
 * A real store rather than lifted useState on purpose: the control panel
 * (always mounted, plain DOM) and the 3D scene (lazily mounted, behind a
 * next/dynamic(ssr:false) boundary) both need to read and write the same
 * selections without one being a parent of the other. Zustand lets both
 * sides subscribe directly with no prop drilling across that boundary,
 * and updates propagate immediately for real-time material switching.
 */
export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  monitor: "Dark",
  keyboard: "Black",
  desk: "Wood",
  background: "Studio",
  setMonitor: (value) => set({ monitor: value }),
  setKeyboard: (value) => set({ keyboard: value }),
  setDesk: (value) => set({ desk: value }),
  setBackground: (value) => set({ background: value }),
}));
