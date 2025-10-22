import { useEffect, useRef } from "react";

interface BitStreamVisualizerProps {
  bitStream: number[];
  label: string;
  color?: string;
}

export function BitStreamVisualizer({ bitStream, label, color = "#3b82f6" }: BitStreamVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bitWidth = width / bitStream.length;

    // Clear canvas
    ctx.fillStyle = "hsl(0 0% 8%)";
    ctx.fillRect(0, 0, width, height);

    // Draw bit stream
    bitStream.forEach((bit, index) => {
      ctx.fillStyle = bit === 1 ? color : "hsl(0 0% 15%)";
      ctx.fillRect(index * bitWidth, 0, bitWidth - 2, height);
    });

    // Draw label
    ctx.fillStyle = "hsl(0 0% 88%)";
    ctx.font = "12px Inter";
    ctx.fillText(label, 10, height - 10);
  }, [bitStream, label, color]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={60}
      className="w-full rounded border border-border"
    />
  );
}
