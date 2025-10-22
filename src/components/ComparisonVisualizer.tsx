import { useEffect, useRef } from "react";

interface ComparisonVisualizerProps {
  title: string;
  traditional: string;
  stochastic: string;
  description: string;
}

export function ComparisonVisualizer({ title, traditional, stochastic, description }: ComparisonVisualizerProps) {
  return (
    <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
      <h4 className="font-semibold text-lg">{title}</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2 p-4 rounded bg-destructive/10 border border-destructive/20">
          <div className="text-xs font-medium text-destructive-foreground/70">Traditional Computing</div>
          <div className="font-mono text-sm text-foreground">{traditional}</div>
        </div>
        <div className="space-y-2 p-4 rounded bg-secondary/10 border border-secondary/20">
          <div className="text-xs font-medium text-secondary-foreground/70">Stochastic Computing</div>
          <div className="font-mono text-sm text-foreground">{stochastic}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
