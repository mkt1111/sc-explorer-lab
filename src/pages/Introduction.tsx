import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ConceptCard } from "@/components/ConceptCard";
import { ComparisonVisualizer } from "@/components/ComparisonVisualizer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Cpu, TrendingDown, Lightbulb } from "lucide-react";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <ModuleLayout
      title="Welcome to Stochastic Computing"
      description="Discover a revolutionary approach to computation using randomness and probability instead of traditional binary arithmetic."
    >
      <InteractiveCard
        title="What is Stochastic Computing?"
        description="A completely different way to think about numbers and calculations"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-foreground/90 text-base leading-relaxed">
            <p>
              Imagine if instead of representing the number "0.75" as a precise binary value like <code>0.11000000</code>, 
              you represented it as a stream of random bits where roughly 75% of them are ones:
            </p>
            <div className="font-mono text-sm bg-muted/30 p-4 rounded border border-border">
              1 1 0 1 1 1 0 1 1 0 1 1 1 1 0 0...
            </div>
            <p>
              That's the core idea of <strong>stochastic computing</strong>! Numbers become probabilities, 
              and calculations become simple logic operations on random bit streams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <ConceptCard emoji="🎲" title="The Big Idea">
              <p>
                Instead of precise digital values, we use <strong>randomness as a feature, not a bug</strong>. 
                A number like 0.6 means "60% chance of seeing a 1 in the stream."
              </p>
            </ConceptCard>
            
            <ConceptCard emoji="🎯" title="Why Does This Help?">
              <p>
                With random streams, complex operations become shockingly simple. 
                Multiplication? Just an AND gate. Division? A simple counter. 
                The hardware becomes incredibly tiny and efficient.
              </p>
            </ConceptCard>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="The 'Aha!' Moment: Why Randomness Works"
        description="Understanding the mathematical magic behind stochastic computing"
      >
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 space-y-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Here's the key insight:</h4>
                <p className="text-foreground/90">
                  If you have two <em>independent</em> random streams A and B, and you want to know 
                  the probability that both are 1 at the same time, it's simply:
                </p>
                <div className="text-center font-mono text-xl py-3">
                  P(A=1 AND B=1) = P(A=1) × P(B=1)
                </div>
                <p className="text-foreground/90">
                  So if stream A represents 0.5 (50% ones) and stream B represents 0.6 (60% ones), 
                  then doing AND on them gives you a stream that's 0.3 (30% ones) — which is exactly 0.5 × 0.6!
                </p>
              </div>
            </div>
          </div>

          <ComparisonVisualizer
            title="Multiplication: Traditional vs. Stochastic"
            traditional="32-bit multiplier circuit: ~1000+ transistors, complex routing, high power"
            stochastic="Single AND gate: 6 transistors, tiny area, ultra-low power"
            description="This dramatic simplification is why SC is attractive for low-power applications. The trade-off? It takes time to process the bit streams, and you need truly random, independent streams."
          />
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Why Use Stochastic Computing?"
        description="The compelling advantages that make SC worth exploring"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <Cpu className="h-10 w-10 text-primary" />
            <h3 className="font-semibold text-lg">Incredibly Simple Circuits</h3>
            <p className="text-sm text-foreground/80">
              Operations that need hundreds of logic gates in traditional computing can be done with 
              just one or two gates in SC. This means smaller chips and lower manufacturing costs.
            </p>
          </div>
          <div className="space-y-3 p-5 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <TrendingDown className="h-10 w-10 text-secondary" />
            <h3 className="font-semibold text-lg">Ultra-Low Power</h3>
            <p className="text-sm text-foreground/80">
              Fewer transistors switching means less power consumed. Perfect for battery-powered devices, 
              IoT sensors, and anywhere energy is precious.
            </p>
          </div>
          <div className="space-y-3 p-5 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
            <Zap className="h-10 w-10 text-accent" />
            <h3 className="font-semibold text-lg">Natural Fault Tolerance</h3>
            <p className="text-sm text-foreground/80">
              A few random bit errors? No problem! Since we're working with probabilities over many bits, 
              individual errors barely affect the final result. The system is inherently robust.
            </p>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="The Trade-offs: Nothing is Free"
        description="Understanding the limitations helps you know when SC makes sense"
      >
        <div className="space-y-4 text-foreground/90">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold mb-2 text-destructive">⚠️ Accuracy vs. Speed</h4>
              <p className="text-sm">
                Want 0.001% error? You'll need thousands of bits, which takes time. 
                Traditional computing gives you instant precision; SC trades time for simplicity.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold mb-2 text-destructive">⚠️ Latency</h4>
              <p className="text-sm">
                You can't know the answer until you've processed the entire bit stream. 
                This introduces delay compared to traditional circuits that compute in one clock cycle.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold mb-2 text-destructive">⚠️ Limited Range</h4>
              <p className="text-sm">
                Basic unipolar encoding only works for numbers between 0 and 1. 
                You can extend this with bipolar encoding, but it adds complexity.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold mb-2 text-destructive">⚠️ Random Number Generation</h4>
              <p className="text-sm">
                You need truly independent random streams for accurate results. 
                Generating these efficiently in hardware is a real challenge.
              </p>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <h3 className="font-semibold text-xl mb-3">🎓 Bottom Line</h3>
        <p className="text-foreground/90 mb-4">
          Stochastic computing shines when you need <strong>low power</strong>, <strong>small hardware</strong>, 
          and can tolerate <strong>some error and latency</strong>. It's perfect for neural networks, 
          signal processing, and sensor applications where approximate results are fine.
        </p>
        <p className="text-sm text-muted-foreground">
          Ready to see how it actually works? Let's explore bit streams next!
        </p>
      </div>

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