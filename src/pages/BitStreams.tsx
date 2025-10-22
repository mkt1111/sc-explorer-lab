import { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { InteractiveCard } from "@/components/InteractiveCard";
import { BitStreamVisualizer } from "@/components/BitStreamVisualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";

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
        title="Understanding Bit Streams"
        description="A bit stream is a sequence of random bits where the probability of '1' represents a numerical value"
      >
        <div className="space-y-4 text-foreground/90">
          <p>
            In <strong>unipolar encoding</strong>, a number between 0 and 1 is represented by the proportion of '1' bits in a random stream. For example:
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>A stream with 50% ones represents 0.5</li>
            <li>A stream with 75% ones represents 0.75</li>
            <li>A stream with 10% ones represents 0.1</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            The longer the stream, the more accurate the representation. However, this comes at the cost of computation time.
          </p>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Interactive Bit Stream Generator"
        description="Adjust the controls to see how different parameters affect the bit stream"
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
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Value:</span>
              <span className="font-mono">{probability.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Actual Value:</span>
              <span className="font-mono">{actualProbability.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Error:</span>
              <span className="font-mono">{Math.abs(probability - actualProbability).toFixed(4)}</span>
            </div>
          </div>
        </div>
      </InteractiveCard>

      <InteractiveCard
        title="Bipolar Encoding (Advanced)"
        description="Representing negative numbers using bipolar encoding"
      >
        <div className="space-y-4 text-foreground/90">
          <p>
            While unipolar encoding represents values in [0, 1], <strong>bipolar encoding</strong> can represent values in [-1, 1]:
          </p>
          <ul className="space-y-2 list-disc list-inside ml-4">
            <li>Bits are mapped: 1 → +1, 0 → -1</li>
            <li>The value is calculated as: (2 × probability - 1)</li>
            <li>50% ones represents 0</li>
            <li>100% ones represents +1</li>
            <li>0% ones represents -1</li>
          </ul>
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
