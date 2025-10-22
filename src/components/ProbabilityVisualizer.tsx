import { useEffect, useRef, useState } from "react";

interface ProbabilityVisualizerProps {
  probability: number;
  samples?: number;
}

export function ProbabilityVisualizer({ probability, samples = 100 }: ProbabilityVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cols = 10;
    const rows = Math.ceil(samples / cols);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    // Clear canvas
    ctx.fillStyle = "hsl(0 0% 6%)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid of squares
    for (let i = 0; i < samples; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = col * cellWidth;
      const y = row * cellHeight;
      
      const isOne = Math.random() < probability;
      
      if (isOne) {
        ctx.fillStyle = "hsl(217 91% 60%)";
      } else {
        ctx.fillStyle = "hsl(0 0% 15%)";
      }
      
      ctx.fillRect(x + 2, y + 2, cellWidth - 4, cellHeight - 4);
    }
  }, [probability, samples]);

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full rounded border border-border"
      />
      <div className="text-xs text-muted-foreground text-center">
        Each square represents a random sample. Blue = 1, Gray = 0. 
        Approximately {Math.round(probability * 100)}% should be blue.
      </div>
    </div>
  );
}
