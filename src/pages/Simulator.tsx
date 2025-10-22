import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { BitStreamVisualizer } from "@/components/BitStreamVisualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function Simulator() {
  const [valueA, setValueA] = useState(0.5);
  const [valueB, setValueB] = useState(0.5);
  const [streamLength, setStreamLength] = useState(128);
  const [isRunning, setIsRunning] = useState(false);
  const [currentBit, setCurrentBit] = useState(0);
  const [streamA, setStreamA] = useState<number[]>([]);
  const [streamB, setStreamB] = useState<number[]>([]);
  const [resultStream, setResultStream] = useState<number[]>([]);

  const generateFullStreams = () => {
    const genStream = (prob: number) =>
      Array.from({ length: streamLength }, () => (Math.random() < prob ? 1 : 0));

    const a = genStream(valueA);
    const b = genStream(valueB);
    const result = a.map((bitA, i) => (bitA && b[i] ? 1 : 0));

    setStreamA(a);
    setStreamB(b);
    setResultStream(result);
    setCurrentBit(0);
  };

  const handleReset = () => {
    generateFullStreams();
    setIsRunning(false);
    toast.success("Simulator reset");
  };

  const handlePlayPause = () => {
    if (!isRunning && currentBit === 0) {
      generateFullStreams();
    }
    setIsRunning(!isRunning);
  };

  // Auto-advance simulation
  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setCurrentBit((prev) => {
        if (prev >= streamLength - 1) {
          setIsRunning(false);
          toast.success("Simulation complete!");
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isRunning, streamLength]);

  const visibleStreamA = streamA.slice(0, currentBit + 1);
  const visibleStreamB = streamB.slice(0, currentBit + 1);
  const visibleResult = resultStream.slice(0, currentBit + 1);

  const currentAvgA = visibleStreamA.length > 0 
    ? visibleStreamA.filter(b => b === 1).length / visibleStreamA.length 
    : 0;
  const currentAvgB = visibleStreamB.length > 0 
    ? visibleStreamB.filter(b => b === 1).length / visibleStreamB.length 
    : 0;
  const currentAvgResult = visibleResult.length > 0 
    ? visibleResult.filter(b => b === 1).length / visibleResult.length 
    : 0;

  return (
    <ModuleLayout
      title="Interactive Simulator"
      description="Experiment with stochastic computing in real-time. Watch bit streams flow through logic gates and see convergence happen!"
    >
      <div className="mb-6 p-5 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <h3 className="font-semibold text-lg mb-2">🎮 How to Use This Simulator</h3>
        <ul className="text-sm text-foreground/90 space-y-1">
          <li>• Adjust the input values (A and B) using the sliders</li>
          <li>• Click "Start" to watch the computation happen bit-by-bit</li>
          <li>• Observe how the running average converges to the expected result</li>
          <li>• Notice how accuracy improves as more bits are processed</li>
        </ul>
      </div>

      <InteractiveCard
        title="Stochastic Multiplication Simulator"
        description="Watch AND gate multiplication happen in real-time, one bit at a time"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Input A Value: {valueA.toFixed(2)}</label>
              <Slider
                value={[valueA]}
                onValueChange={(val) => setValueA(val[0])}
                min={0}
                max={1}
                step={0.05}
                className="w-full"
                disabled={isRunning}
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Input B Value: {valueB.toFixed(2)}</label>
              <Slider
                value={[valueB]}
                onValueChange={(val) => setValueB(val[0])}
                min={0}
                max={1}
                step={0.05}
                className="w-full"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Stream Length: {streamLength} bits</label>
            <Slider
              value={[streamLength]}
              onValueChange={(val) => setStreamLength(val[0])}
              min={32}
              max={256}
              step={32}
              className="w-full"
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">
              Longer streams = better accuracy but slower computation
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handlePlayPause} className="gap-2">
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  {currentBit > 0 ? "Resume" : "Start Simulation"}
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {streamA.length > 0 && (
            <>
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="text-sm font-medium">Progress:</span>
                  <span className="font-mono text-sm">
                    {currentBit + 1} / {streamLength} bits ({((currentBit + 1) / streamLength * 100).toFixed(1)}%)
                  </span>
                </div>
                
                <BitStreamVisualizer
                  bitStream={[...visibleStreamA, ...Array(streamLength - visibleStreamA.length).fill(0.5)]}
                  label={`Stream A (current avg: ${currentAvgA.toFixed(3)})`}
                  color="hsl(217 91% 60%)"
                />
                <BitStreamVisualizer
                  bitStream={[...visibleStreamB, ...Array(streamLength - visibleStreamB.length).fill(0.5)]}
                  label={`Stream B (current avg: ${currentAvgB.toFixed(3)})`}
                  color="hsl(160 84% 39%)"
                />
                <div className="text-center py-3 px-4 bg-muted/30 rounded border border-border">
                  <div className="text-xs text-muted-foreground mb-1">⚡ AND Gate (Multiplication)</div>
                  <div className="font-mono text-sm">
                    Result[i] = A[i] AND B[i]
                  </div>
                </div>
                <BitStreamVisualizer
                  bitStream={[...visibleResult, ...Array(streamLength - visibleResult.length).fill(0.5)]}
                  label={`Result Stream (current avg: ${currentAvgResult.toFixed(3)})`}
                  color="hsl(280 91% 60%)"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="text-xs text-muted-foreground mb-2">Expected Result</div>
                  <div className="text-3xl font-mono">{(valueA * valueB).toFixed(4)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {valueA.toFixed(2)} × {valueB.toFixed(2)}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="text-xs text-muted-foreground mb-2">Current Result</div>
                  <div className="text-3xl font-mono">{currentAvgResult.toFixed(4)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    From {currentBit + 1} bits
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-2">Error</div>
                  <div className="text-3xl font-mono">{Math.abs(valueA * valueB - currentAvgResult).toFixed(4)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((Math.abs(valueA * valueB - currentAvgResult) / (valueA * valueB)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="What You're Seeing: Key Observations"
        description="Understanding the simulation and what it teaches us"
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <h4 className="font-semibold mb-2">📈 Convergence in Action</h4>
              <p className="text-sm text-foreground/80">
                Watch how the "Current Result" starts jumping around but gradually settles toward 
                the "Expected Result". This is the <strong>law of large numbers</strong> in action: 
                as you process more random bits, the average converges to the true probability.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <h4 className="font-semibold mb-2">🎯 Accuracy vs. Speed</h4>
              <p className="text-sm text-foreground/80">
                After just 32 bits, you might have 5-10% error. After 128 bits, it drops to 1-2%. 
                After 256 bits, often under 1%. This shows the fundamental trade-off: 
                <strong> more bits = better accuracy but more time</strong>.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <h4 className="font-semibold mb-2">🎲 Randomness is Key</h4>
              <p className="text-sm text-foreground/80">
                Each time you run the simulation, you get a different sequence of bits, 
                but the final result is similar. This shows that it's the <strong>statistical properties</strong> 
                (the average) that matter, not the specific sequence.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-border/50">
              <h4 className="font-semibold mb-2">⚡ Simplicity of Hardware</h4>
              <p className="text-sm text-foreground/80">
                Remember: all this multiplication is happening with <strong>just one AND gate</strong>! 
                Compare that to a traditional multiplier with hundreds of gates. That's the power 
                of encoding numbers as probabilities.
              </p>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <h3 className="font-semibold text-xl mb-3">🧪 Try These Experiments</h3>
        <ul className="space-y-2 text-sm text-foreground/90">
          <li>• <strong>Small vs. Large streams:</strong> Compare 32-bit vs. 256-bit runs. How much does accuracy improve?</li>
          <li>• <strong>Different values:</strong> Try multiplying 0.9 × 0.9 vs. 0.1 × 0.1. Do you notice different error patterns?</li>
          <li>• <strong>Edge cases:</strong> What happens when you multiply by 0? By 1? Does it behave as expected?</li>
          <li>• <strong>Pause and inspect:</strong> Pause mid-simulation and look at the current averages. Are they converging?</li>
        </ul>
      </div>
    </ModuleLayout>
  );
}
