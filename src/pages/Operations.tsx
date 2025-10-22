import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { BitStreamVisualizer } from "@/components/BitStreamVisualizer";
import { ConceptCard } from "@/components/ConceptCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw, Lightbulb } from "lucide-react";

export default function Operations() {
  const navigate = useNavigate();
  const [valueA, setValueA] = useState(0.6);
  const [valueB, setValueB] = useState(0.4);
  const [streamLength] = useState(64);
  const [streamA, setStreamA] = useState<number[]>([]);
  const [streamB, setStreamB] = useState<number[]>([]);
  const [resultStream, setResultStream] = useState<number[]>([]);

  const generateStreams = () => {
    const genStream = (prob: number) =>
      Array.from({ length: streamLength }, () => (Math.random() < prob ? 1 : 0));

    const a = genStream(valueA);
    const b = genStream(valueB);
    const result = a.map((bitA, i) => (bitA && b[i] ? 1 : 0));

    setStreamA(a);
    setStreamB(b);
    setResultStream(result);
  };

  useEffect(() => {
    generateStreams();
  }, [valueA, valueB, streamLength]);

  const actualA = streamA.length > 0 ? streamA.filter(b => b === 1).length / streamA.length : 0;
  const actualB = streamB.length > 0 ? streamB.filter(b => b === 1).length / streamB.length : 0;
  const actualResult = resultStream.length > 0 ? resultStream.filter(b => b === 1).length / resultStream.length : 0;
  const expectedResult = valueA * valueB;

  return (
    <ModuleLayout
      title="Basic Operations"
      description="Learn how simple logic gates perform complex arithmetic in stochastic computing."
    >
      <InteractiveCard
        title="The Magic of Multiplication"
        description="Why a single AND gate can multiply two numbers"
      >
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">The Core Principle</h4>
                <p className="text-foreground/90">
                  Imagine you have two friends flipping coins. Friend A gets heads 60% of the time 
                  (probability 0.6), and Friend B gets heads 40% of the time (probability 0.4).
                </p>
                <p className="text-foreground/90">
                  Now ask: "What's the chance they <strong>both</strong> get heads on the same flip?"
                </p>
                <div className="text-center font-mono text-xl py-3 bg-muted/30 rounded">
                  P(both heads) = 0.6 × 0.4 = 0.24 (24%)
                </div>
                <p className="text-foreground/90">
                  This is basic probability! For <em>independent events</em>, the probability of both happening 
                  is the product of their individual probabilities. That's exactly what the AND gate does to bit streams!
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Step-by-Step: How AND Multiplies</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ConceptCard title="Step 1: Two Independent Streams">
                <p>Stream A: 60% ones (represents 0.6)</p>
                <p>Stream B: 40% ones (represents 0.4)</p>
                <p className="text-xs text-muted-foreground mt-2">
                  The streams must be generated independently (different random sequences).
                </p>
              </ConceptCard>
              
              <ConceptCard title="Step 2: Apply AND Gate">
                <p>For each position i, output[i] = A[i] AND B[i]</p>
                <p>Output is 1 only when <strong>both</strong> inputs are 1.</p>
                <p className="text-xs text-muted-foreground mt-2">
                  This happens with probability P(A=1) × P(B=1).
                </p>
              </ConceptCard>
              
              <ConceptCard title="Step 3: Count the Result">
                <p>The output stream will have 24% ones (on average).</p>
                <p className="text-xs text-muted-foreground mt-2">
                  0.24 is exactly 0.6 × 0.4. Multiplication complete!
                </p>
              </ConceptCard>
              
              <ConceptCard title="🎯 Why It's Amazing">
                <p>Traditional multiplier: ~1000 transistors</p>
                <p>SC multiplier: 6 transistors (one AND gate)</p>
                <p className="text-xs text-muted-foreground mt-2">
                  167× simpler! That's the power of stochastic computing.
                </p>
              </ConceptCard>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Interactive Multiplication Simulator"
        description="See the AND gate multiply in real-time. Adjust the inputs and watch the magic happen!"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Input A: {valueA.toFixed(2)}</label>
              <Button size="sm" variant="outline" onClick={generateStreams}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <Slider
              value={[valueA]}
              onValueChange={(val) => setValueA(val[0])}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Input B: {valueB.toFixed(2)}</label>
            <Slider
              value={[valueB]}
              onValueChange={(val) => setValueB(val[0])}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div className="space-y-4 pt-4">
            <BitStreamVisualizer
              bitStream={streamA}
              label={`Stream A (${valueA.toFixed(2)})`}
              color="hsl(217 91% 60%)"
            />
            <BitStreamVisualizer
              bitStream={streamB}
              label={`Stream B (${valueB.toFixed(2)})`}
              color="hsl(160 84% 39%)"
            />
            <div className="text-center py-3 px-4 bg-muted/30 rounded border border-border">
              <div className="text-xs text-muted-foreground mb-1">AND Gate Operation</div>
              <div className="font-mono text-sm">
                Output[i] = A[i] <span className="text-primary">AND</span> B[i]
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Both must be 1 for output to be 1
              </div>
            </div>
            <BitStreamVisualizer
              bitStream={resultStream}
              label={`Result (${valueA.toFixed(2)} × ${valueB.toFixed(2)} = ${expectedResult.toFixed(2)})`}
              color="hsl(280 91% 60%)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-2">
              <div className="text-sm text-muted-foreground">Expected Result</div>
              <div className="text-2xl font-mono">{expectedResult.toFixed(4)}</div>
              <div className="text-xs text-muted-foreground">
                ({valueA.toFixed(2)} × {valueB.toFixed(2)})
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 space-y-2">
              <div className="text-sm text-muted-foreground">Actual Result</div>
              <div className="text-2xl font-mono">{actualResult.toFixed(4)}</div>
              <div className="text-xs text-muted-foreground">
                Error: {Math.abs(expectedResult - actualResult).toFixed(4)}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-semibold mb-2 text-sm">💡 Experiment!</h4>
            <p className="text-sm text-foreground/80">
              Try different values and click "Regenerate" to see different random streams. 
              Notice how the actual result varies slightly each time due to randomness, 
              but always stays close to the expected product. With longer streams (more bits), 
              the accuracy improves!
            </p>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Other Basic Operations"
        description="More operations with simple logic gates"
      >
        <div className="space-y-5">
          <div className="p-5 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50">
            <h4 className="font-semibold mb-3">Scaled Addition (Averaging)</h4>
            <p className="text-sm text-foreground/90 mb-3">
              To add A + B in stochastic computing, we use a <strong>2-to-1 multiplexer (MUX)</strong> 
              with a random selection signal.
            </p>
            <div className="p-3 rounded bg-muted/30 border border-border text-sm space-y-2">
              <div className="font-mono">MUX(A, B, random) = A with 50% probability, B with 50% probability</div>
              <div>Result: Output = 0.5 × (A + B)</div>
              <p className="text-xs text-muted-foreground">
                Why? If we randomly pick A or B each cycle, we get an average of the two values!
              </p>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50">
            <h4 className="font-semibold mb-3">Inversion (NOT Gate)</h4>
            <p className="text-sm text-foreground/90 mb-3">
              This one's simple: just flip all the bits!
            </p>
            <div className="p-3 rounded bg-muted/30 border border-border text-sm space-y-2">
              <div className="font-mono">Output[i] = NOT A[i]</div>
              <div>If P(A=1) = 0.7, then P(NOT A=1) = 0.3</div>
              <p className="text-xs text-muted-foreground">
                Mathematically: 1 - p becomes (1-p) in the output stream.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50">
            <h4 className="font-semibold mb-3">Division (Advanced)</h4>
            <p className="text-sm text-foreground/90 mb-3">
              Division is trickier and requires sequential logic like <strong>JK flip-flops</strong>.
            </p>
            <div className="p-3 rounded bg-muted/30 border border-border text-sm">
              <p className="text-xs text-muted-foreground">
                The divider uses state to track the accumulated ratio over time. It's more complex 
                than multiplication, but still much simpler than traditional divider circuits!
              </p>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <div className="flex justify-end pt-4">
        <Button 
          size="lg" 
          onClick={() => navigate("/simulator")}
          className="gap-2 glow-primary"
        >
          Try the Interactive Simulator
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </ModuleLayout>
  );
}
