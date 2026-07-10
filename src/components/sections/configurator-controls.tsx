"use client";

import { motion } from "framer-motion";
import { useConfiguratorStore } from "@/lib/configurator-store";
import { monitorOptions, keyboardOptions, deskOptions, backgroundOptions } from "@/data/configurator";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function SwatchGroup<T extends string>({
  groupId,
  label,
  options,
  active,
  onSelect,
}: {
  groupId: string;
  label: string;
  options: { value: T; swatch: string }[];
  active: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-mono-label mb-3 text-steel">{label}</p>
      <div className="flex gap-3">
        {options.map((option) => {
          const isActive = option.value === active;
          const isRgb = option.value === "RGB";
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isActive}
              aria-label={`${label}: ${option.value}`}
              className="group flex flex-col items-center gap-1.5"
            >
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span
                  className={cn(
                    "h-6 w-6 rounded-full border transition-transform group-hover:scale-110",
                    isActive ? "border-transparent" : "border-line-strong"
                  )}
                  style={
                    isRgb
                      ? { background: "conic-gradient(#ff4d1c, #ffb000, #19e6c8, #6c5ce7, #ff4d1c)" }
                      : { backgroundColor: option.swatch }
                  }
                />
                {isActive && (
                  <motion.span
                    layoutId={`${groupId}-active-ring`}
                    className="absolute inset-0 rounded-full border-2 border-signal"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                )}
              </span>
              <span className={cn("text-mono-label", isActive ? "text-ink" : "text-steel")}>{option.value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ConfiguratorControls() {
  const monitor = useConfiguratorStore((s) => s.monitor);
  const keyboard = useConfiguratorStore((s) => s.keyboard);
  const desk = useConfiguratorStore((s) => s.desk);
  const background = useConfiguratorStore((s) => s.background);
  const setMonitor = useConfiguratorStore((s) => s.setMonitor);
  const setKeyboard = useConfiguratorStore((s) => s.setKeyboard);
  const setDesk = useConfiguratorStore((s) => s.setDesk);
  const setBackground = useConfiguratorStore((s) => s.setBackground);

  return (
    <div className="flex flex-col gap-6 rounded-sm border border-line-strong bg-paper/70 p-5 backdrop-blur-md">
      <SwatchGroup groupId="monitor" label="MONITOR" options={monitorOptions} active={monitor} onSelect={setMonitor} />
      <SwatchGroup
        groupId="keyboard"
        label="KEYBOARD"
        options={keyboardOptions}
        active={keyboard}
        onSelect={setKeyboard}
      />
      <SwatchGroup groupId="desk" label="DESK" options={deskOptions} active={desk} onSelect={setDesk} />
      <SwatchGroup
        groupId="background"
        label="BACKGROUND"
        options={backgroundOptions}
        active={background}
        onSelect={setBackground}
      />
    </div>
  );
}
