"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
export function useHasFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
