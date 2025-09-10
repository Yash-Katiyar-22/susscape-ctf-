import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, Database, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import redCrewmate from "@/assets/red-crewmate.png";

interface LevelTwoProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelTwo = ({ onComplete, isCompleted }: LevelTwoProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onComplete(answer);
    
    if (success) {
      toast.success("Data structure identified! Moving to next evidence...");
      setAnswer("");
    } else {
      toast.error("Incorrect structure. Analyze the performance data again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={redCrewmate} alt="Suspicious Activity" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 2: DATABASE ANALYSIS</h2>
          <p className="text-muted-foreground">Performance anomalies detected</p>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse ml-auto" />
        )}
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ SOLVED</span>
            <span className="text-muted-foreground">Data structure successfully identified</span>
          </div>
        </div>
      )}

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">💾 DATABASE PERFORMANCE LOG</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded">
            <h4 className="font-medium text-sus-accent mb-2">Operation Times (ms):</h4>
            <ul className="text-sm space-y-1 font-mono">
              <li>INSERT: 1.2ms</li>
              <li>SEARCH: 1.1ms</li>
              <li>DELETE: 1.3ms</li>
              <li>UPDATE: 1.4ms</li>
            </ul>
          </div>
          
          <div className="bg-background/50 p-4 rounded">
            <h4 className="font-medium text-sus-accent mb-2">Structure Properties:</h4>
            <ul className="text-sm space-y-1">
              <li>Key-value pairs</li>
              <li>O(1) average complexity</li>
              <li>Direct memory access</li>
              <li>Collision handling required</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-3">🔍 SYSTEM ANALYSIS</h3>
        <p className="text-muted-foreground text-sm">
          The security database shows constant-time operations and uses key-based lookups. 
          Identify the data structure based on these performance characteristics.
        </p>
      </div>

      {!isCompleted && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Data Structure Name:</label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the data structure name..."
              className="sus-input"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !answer.trim()}
            className="sus-button w-full"
          >
            {isSubmitting ? "ANALYZING..." : "SUBMIT ANALYSIS"}
          </Button>
        </form>
      )}

      <div className="text-center">
        <div className="sus-progress-indicator">
          <span className="text-sus-accent">LEVEL 2</span>
          <span className="text-muted-foreground">/ 7</span>
        </div>
      </div>
    </div>
  );
};