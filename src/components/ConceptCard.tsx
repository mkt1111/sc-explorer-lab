import { ReactNode } from "react";

interface ConceptCardProps {
  emoji?: string;
  title: string;
  children: ReactNode;
}

export function ConceptCard({ emoji, title, children }: ConceptCardProps) {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50 space-y-3">
      {emoji && <div className="text-4xl mb-2">{emoji}</div>}
      <h4 className="font-semibold text-lg text-foreground">{title}</h4>
      <div className="text-sm text-foreground/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
