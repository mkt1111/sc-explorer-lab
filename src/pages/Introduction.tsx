import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Cpu, TrendingDown } from "lucide-react";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <ModuleLayout
      title="Welcome to Stochastic Computing"
      description="Discover a revolutionary approach to computation using randomness and probability instead of traditional binary arithmetic."
    >
      <InteractiveCard
        title="What is Stochastic Computing?"
        description="Learn the fundamental concept behind this probabilistic computing paradigm"
      >
        <div className="space-y-4 text-foreground/90">
          <p>
            <strong>Stochastic Computing (SC)</strong> is a unique computational method that represents numbers as sequences of random bits (bit streams) instead of traditional binary values. The probability of a bit being '1' in the stream encodes the numerical value.
          </p>
          <p>
            For example, a bit stream with 75% ones represents the value 0.75. This simple representation enables remarkably simple hardware for complex operations.
          </p>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Why Use Stochastic Computing?"
        description="Explore the key advantages that make SC attractive for certain applications"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
            <Cpu className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-lg">Simple Circuits</h3>
            <p className="text-sm text-muted-foreground">
              Complex operations like multiplication can be implemented with just an AND gate, drastically reducing hardware complexity.
            </p>
          </div>
          <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
            <TrendingDown className="h-8 w-8 text-secondary" />
            <h3 className="font-semibold text-lg">Low Power</h3>
            <p className="text-sm text-muted-foreground">
              Simpler circuits consume less power, making SC ideal for energy-constrained applications like IoT devices.
            </p>
          </div>
          <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
            <Zap className="h-8 w-8 text-accent" />
            <h3 className="font-semibold text-lg">Fault Tolerance</h3>
            <p className="text-sm text-muted-foreground">
              Random bit errors have minimal impact on the overall computation, providing natural resilience to noise.
            </p>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Key Trade-offs"
        description="Understanding the limitations helps determine when to use stochastic computing"
      >
        <div className="space-y-4 text-foreground/90">
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <strong>Accuracy vs. Stream Length:</strong> Longer bit streams provide higher accuracy but take more time to compute.
            </li>
            <li>
              <strong>Latency:</strong> Results are only available after processing the entire bit stream, introducing computational delay.
            </li>
            <li>
              <strong>Limited Range:</strong> Standard unipolar encoding represents values between 0 and 1 only.
            </li>
            <li>
              <strong>Correlation Issues:</strong> Independent random streams are required for accurate operations, which can be challenging to generate.
            </li>
          </ul>
        </div>
      </InteractiveCard>

      <div className="flex justify-end pt-4">
        <Button 
          size="lg" 
          onClick={() => navigate("/bit-streams")}
          className="gap-2 glow-primary"
        >
          Continue to Bit Streams
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ModuleLayout>
  );
}
