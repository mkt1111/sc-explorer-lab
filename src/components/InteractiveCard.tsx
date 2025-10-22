import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InteractiveCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function InteractiveCard({ title, description, children }: InteractiveCardProps) {
  return (
    <Card className="border-border bg-card hover:border-primary/50 transition-smooth">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription className="text-base">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}
