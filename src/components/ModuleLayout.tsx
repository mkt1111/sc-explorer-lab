import { ReactNode } from "react";

interface ModuleLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ModuleLayout({ title, description, children }: ModuleLayoutProps) {
  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {description}
          </p>
        </header>
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
