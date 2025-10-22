import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { BitStreamVisualizer } from "@/components/BitStreamVisualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";

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
        title="Multiplication with AND Gate"
        description="The simplest operation in SC: multiply two numbers using just an AND gate!"
      >
        <div className="space-y-4 text-foreground/90">
          <p>
            In stochastic computing, <strong>multiplication</strong> is remarkably simple. To multiply two values represented by bit streams A and B:
          </p>
          <ol className="space-y-2 list-decimal list-inside ml-4">
            <li>Generate independent random bit streams for A and B</li>
            <li>Perform bitwise AND operation: C[i] = A[i] AND B[i]</li>
            <li>The probability of '1' in C equals P(A) × P(B)</li>
          </ol>
          <p className="text-sm text-muted-foreground">
            This is because P(C=1) = P(A=1 AND B=1) = P(A=1) × P(B=1) for independent streams.
          </p>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Interactive Multiplication Simulator"
        description="Adjust the input values and watch the AND gate multiply them in real-time"
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
            <div className="text-center py-2 text-sm font-mono text-muted-foreground">
              ↓ AND Gate ↓
            </div>
            <BitStreamVisualizer
              bitStream={resultStream}
              label={`Result (${valueA.toFixed(2)} × ${valueB.toFixed(2)})`}
              color="hsl(280 91% 60%)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected:</span>
                <span className="font-mono">{expectedResult.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual:</span>
                <span className="font-mono">{actualResult.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Error:</span>
                <span className="font-mono">{Math.abs(expectedResult - actualResult).toFixed(4)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stream A actual:</span>
                <span className="font-mono">{actualA.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stream B actual:</span>
                <span className="font-mono">{actualB.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Other Basic Operations"
        description="More operations with simple gates"
      >
        <div className="space-y-4 text-foreground/90">
          <div className="space-y-3">
            <h3 className="font-semibold">Scaled Addition (Averaging)</h3>
            <p className="text-sm">
              Using a 2-to-1 MUX with a random selection signal: <code>Output = 0.5 × (A + B)</code>
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Inversion (NOT Gate)</h3>
            <p className="text-sm">
              Simply invert the bit stream: if P(A) = 0.7, then P(NOT A) = 0.3
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Division</h3>
            <p className="text-sm">
              More complex: requires specialized circuits like the JK flip-flop divider
            </p>
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
