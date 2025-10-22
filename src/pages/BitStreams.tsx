import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { BitStreamVisualizer } from "@/components/BitStreamVisualizer";
import { ProbabilityVisualizer } from "@/components/ProbabilityVisualizer";
import { ConceptCard } from "@/components/ConceptCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw, Lightbulb } from "lucide-react";

export default function BitStreams() {
  const navigate = useNavigate();
  const [probability, setProbability] = useState(0.5);
  const [streamLength, setStreamLength] = useState(64);
  const [bitStream, setBitStream] = useState<number[]>([]);

  const generateBitStream = () => {
    const stream = Array.from({ length: streamLength }, () =>
      Math.random() < probability ? 1 : 0
    );
    setBitStream(stream);
  };

  useEffect(() => {
    generateBitStream();
  }, [probability, streamLength]);

  const actualProbability = bitStream.length > 0
    ? bitStream.filter(bit => bit === 1).length / bitStream.length
    : 0;

  return (
    <ModuleLayout
      title="Bit Streams & Representation"
      description="Explore how numbers are encoded as random bit sequences in stochastic computing."
    >
      <InteractiveCard
        title="From Numbers to Probabilities"
        description="Understanding the fundamental encoding that makes stochastic computing work"
      >
        <div className="space-y-6">
          <div className="space-y-4 text-foreground/90 text-base leading-relaxed">
            <p>
              In traditional computing, the number 0.75 might be stored as the binary fraction <code>0.11000000</code>. 
              But in stochastic computing, we represent it completely differently:
            </p>
            
            <div className="p-5 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-3">
                  <h4 className="font-semibold">The Encoding Rule</h4>
                  <p>
                    To represent a number <strong>p</strong> between 0 and 1:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Generate a stream of random bits (0s and 1s)</li>
                    <li>Make each bit have a <strong>p</strong> probability of being 1</li>
                    <li>That's it! The proportion of 1s encodes your number</li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    For example, 0.75 means "75% of the bits should be 1 (on average)".
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <ConceptCard title="Example: 0.25">
              <p>25% of bits are 1:</p>
              <code className="text-xs">1 0 0 0 1 0 0 0...</code>
            </ConceptCard>
            <ConceptCard title="Example: 0.50">
              <p>50% of bits are 1:</p>
              <code className="text-xs">1 0 1 0 1 1 0 0...</code>
            </ConceptCard>
            <ConceptCard title="Example: 0.75">
              <p>75% of bits are 1:</p>
              <code className="text-xs">1 1 0 1 1 1 1 0...</code>
            </ConceptCard>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2">🤔 Why Randomness?</h4>
            <p className="text-sm text-foreground/80">
              The randomness is crucial! If we used a pattern like <code>1 1 1 0 1 1 1 0</code> for 0.75, 
              correlations would break the math when we combine streams. Random (independent) streams 
              ensure the probability rules work correctly.
            </p>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Visualizing Probability"
        description="See how randomness creates the target probability"
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">Probability: {probability.toFixed(2)}</label>
            <Slider
              value={[probability]}
              onValueChange={(val) => setProbability(val[0])}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>
          <ProbabilityVisualizer probability={probability} samples={100} />
          <p className="text-sm text-muted-foreground">
            Each time you adjust the slider, a new random sample is generated. Notice how the proportion 
            of blue squares matches your target probability (on average).
          </p>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Interactive Bit Stream Generator"
        description="Generate your own stochastic bit streams and see the accuracy"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Target Probability: {probability.toFixed(2)}</label>
              <Button size="sm" variant="outline" onClick={generateBitStream}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <Slider
              value={[probability]}
              onValueChange={(val) => setProbability(val[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Stream Length: {streamLength} bits</label>
            <Slider
              value={[streamLength]}
              onValueChange={(val) => setStreamLength(val[0])}
              min={16}
              max={256}
              step={16}
              className="w-full"
            />
          </div>

          <div className="space-y-4 pt-4">
            <BitStreamVisualizer
              bitStream={bitStream}
              label={`Bit Stream (Target: ${probability.toFixed(2)})`}
              color="hsl(217 91% 60%)"
            />
            
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30 border border-border">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Target</div>
                <div className="text-lg font-mono">{probability.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Actual</div>
                <div className="text-lg font-mono">{actualProbability.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Error</div>
                <div className="text-lg font-mono">{Math.abs(probability - actualProbability).toFixed(4)}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-semibold mb-2 text-sm">💡 Key Insight</h4>
              <p className="text-sm text-foreground/80">
                Notice how longer streams give more accurate representations! With only 16 bits, 
                the error can be significant. With 256 bits, you get much closer to the target. 
                This is the fundamental trade-off: <strong>accuracy vs. computation time</strong>.
              </p>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Advanced: Bipolar Encoding"
        description="Representing negative numbers using bipolar encoding"
      >
        <div className="space-y-4">
          <div className="space-y-4 text-foreground/90">
            <p>
              So far we've used <strong>unipolar encoding</strong>, which represents values in [0, 1]. 
              But what if you need negative numbers?
            </p>
            <p>
              <strong>Bipolar encoding</strong> extends the range to [-1, 1]:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-2">
              <h4 className="font-semibold text-sm">Unipolar Encoding</h4>
              <ul className="text-sm space-y-1">
                <li>• Bits: 0 or 1</li>
                <li>• Range: [0, 1]</li>
                <li>• 100% ones = 1.0</li>
                <li>• 50% ones = 0.5</li>
                <li>• 0% ones = 0.0</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 space-y-2">
              <h4 className="font-semibold text-sm">Bipolar Encoding</h4>
              <ul className="text-sm space-y-1">
                <li>• Bits: +1 or -1</li>
                <li>• Range: [-1, 1]</li>
                <li>• 100% ones = +1.0</li>
                <li>• 50% ones = 0.0</li>
                <li>• 0% ones = -1.0</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2">The Conversion</h4>
            <p className="text-sm text-foreground/80">
              In bipolar encoding, we interpret 0 → -1 and 1 → +1. The value becomes:
            </p>
            <div className="text-center font-mono text-lg py-2">
              value = 2 × P(bit=1) - 1
            </div>
            <p className="text-sm text-foreground/80">
              So if 75% of bits are 1: value = 2(0.75) - 1 = 0.5
            </p>
          </div>
        </div>
      </InteractiveCard>

      <div className="flex justify-end pt-4">
        <Button 
          size="lg" 
          onClick={() => navigate("/operations")}
          className="gap-2 glow-primary"
        >
          Explore Basic Operations
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ModuleLayout>
  );
}
