import { ImageIcon } from "lucide-react";
export function ScreenshotPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col bg-line/40">
      <div className="flex items-center gap-1.5 border-b border-line-strong/50 px-3 py-2">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-line-strong" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-steel">
        <ImageIcon size={22} aria-hidden />
        <span className="text-mono-label">ADD SCREENSHOT</span>
      </div>
    </div>
  );
}
