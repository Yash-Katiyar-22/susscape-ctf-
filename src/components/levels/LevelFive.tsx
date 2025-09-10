import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import blueCrewmate from "@/assets/blue-crewmate.png";

interface LevelFiveProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelFive = ({ onComplete, isCompleted }: LevelFiveProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const treeData = {
    value: 50,
    left: {
      value: 30,
      left: { value: 20, left: null, right: null },
      right: { value: 40, left: null, right: null }
    },
    right: {
      value: 70,
      left: { value: 60, left: null, right: null },
      right: { value: 80, left: null, right: null }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onComplete(answer.trim());
    
    if (success) {
      toast.success("Tree structure identified! Moving to next evidence...");
    } else {
      toast.error("Incorrect data structure. Analyze the tree properties again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={blueCrewmate} alt="Analyzing" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 5: DATA STRUCTURE ANALYSIS</h2>
          <p className="text-muted-foreground">Tree topology investigation required</p>
        </div>
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ SOLVED</span>
            <span className="text-muted-foreground">Data structure successfully classified</span>
          </div>
        </div>
      )}

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">🔍 SECURITY DATABASE STRUCTURE</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Node Hierarchy Found:</h4>
            <div className="bg-background/50 p-4 rounded font-mono text-sm">
              <div className="text-center mb-2">50</div>
              <div className="flex justify-between mb-2">
                <span>30</span>
                <span>70</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>20 40</span>
                <span>60 80</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Properties Detected:</h4>
            <ul className="text-sm space-y-2">
              <li>All left children &lt; parent node</li>
              <li>All right children &gt; parent node</li>
              <li>O(log n) search capability</li>
              <li>Recursive structure maintained</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-3">💡 ANALYSIS REQUIRED</h3>
        <p className="text-muted-foreground">
          The security system uses a hierarchical data structure for fast lookups. 
          Identify the specific tree type based on its ordering properties.
        </p>
      </div>

      {!isCompleted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Data Structure Name:</label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the tree structure type..."
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
          <span className="text-sus-accent">LEVEL 5</span>
          <span className="text-muted-foreground">/ 7</span>
        </div>
      </div>
    </div>
  );
};