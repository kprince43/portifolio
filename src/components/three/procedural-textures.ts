import { CanvasTexture, RepeatWrapping } from "three";

function createCanvas(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

/** Simple procedural wood-grain pattern — wavy horizontal streaks over a base wood tone. */
export function createWoodTexture() {
  const canvas = createCanvas(256);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#8a5a34";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 36; i++) {
    const y = (i / 36) * canvas.height;
    ctx.strokeStyle = `rgba(58, 33, 16, ${0.12 + (i % 5) * 0.03})`;
    ctx.lineWidth = 1 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 5);
    }
    ctx.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 1);
  return texture;
}

/** Simple procedural carbon-fiber weave — alternating tiled diagonal squares. */
export function createCarbonTexture() {
  const canvas = createCanvas(64);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const tile = 8;
  for (let y = 0; y < canvas.height; y += tile) {
    for (let x = 0; x < canvas.width; x += tile) {
      const offset = (Math.floor(y / tile) % 2) * (tile / 2);
      const isLight = Math.floor((x + offset) / (tile / 2)) % 2 === 0;
      ctx.fillStyle = isLight ? "#2a2e33" : "#15171a";
      ctx.fillRect(x, y, tile, tile);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}
