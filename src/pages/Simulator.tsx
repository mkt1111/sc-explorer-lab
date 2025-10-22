import { useState } from "react";
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
  useState(() => {
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
  });

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
      description="Experiment with stochastic computing in real-time. Watch bit streams flow through logic gates."
    >
      <InteractiveCard
        title="Stochastic Multiplication Simulator"
        description="Configure inputs and watch the computation happen bit by bit"
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
                  {currentBit > 0 ? "Resume" : "Start"}
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
                <div className="text-sm text-muted-foreground">
                  Progress: {currentBit + 1} / {streamLength} bits ({((currentBit + 1) / streamLength * 100).toFixed(1)}%)
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
                <div className="text-center py-2 text-sm font-mono text-muted-foreground">
                  ↓ AND Gate (Multiplication) ↓
                </div>
                <BitStreamVisualizer
                  bitStream={[...visibleResult, ...Array(streamLength - visibleResult.length).fill(0.5)]}
                  label={`Result (current avg: ${currentAvgResult.toFixed(3)})`}
                  color="hsl(280 91% 60%)"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 text-sm border-t border-border pt-6">
                <div>
                  <div className="text-muted-foreground mb-2">Expected Result</div>
                  <div className="text-2xl font-mono">{(valueA * valueB).toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-2">Current Result</div>
                  <div className="text-2xl font-mono">{currentAvgResult.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-2">Error</div>
                  <div className="text-2xl font-mono">{Math.abs(valueA * valueB - currentAvgResult).toFixed(4)}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Key Observations"
        description="What you should notice from the simulation"
      >
        <div className="space-y-4 text-foreground/90">
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <strong>Convergence:</strong> As more bits are processed, the running average converges to the expected value
            </li>
            <li>
              <strong>Accuracy vs. Length:</strong> Longer streams give more accurate results but take more time
            </li>
            <li>
              <strong>Randomness:</strong> Each run produces different bit sequences but similar final results
            </li>
            <li>
              <strong>Simple Hardware:</strong> Complex multiplication is achieved with just an AND gate!
            </li>
          </ul>
        </div>
      </InteractiveCard>
    </ModuleLayout>
  );
}
