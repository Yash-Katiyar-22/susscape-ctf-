import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import impostorImage from "@/assets/impostor.png";

interface LevelSevenProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelSeven = ({ onComplete, isCompleted }: LevelSevenProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fibonacciSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  const knapsackItems = [
    { item: "Emergency Kit", weight: 10, value: 60 },
    { item: "Food Supply", weight: 20, value: 100 },
    { item: "Medical Pack", weight: 30, value: 120 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = onComplete(answer.trim());
    
    if (success) {
      toast.success("CASE SOLVED! The impostor's method has been exposed!");
    } else {
      toast.error("Incorrect approach. The optimization technique is key.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={impostorImage} alt="Final Evidence" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 7: FINAL EVIDENCE</h2>
          <p className="text-muted-foreground">The impostor's optimization strategy revealed</p>
        </div>
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ CASE CLOSED</span>
            <span className="text-muted-foreground">All evidence processed successfully</span>
          </div>
        </div>
      )}

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">🔍 FINAL ALGORITHM ANALYSIS</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Pattern Recognition:</h4>
            <div className="bg-background/50 p-4 rounded">
              <div className="font-mono text-sm">
                <div>F(0) = 0, F(1) = 1</div>
                <div>F(n) = F(n-1) + F(n-2)</div>
                <div className="mt-2">Sequence: {fibonacciSequence.join(", ")}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              The impostor used overlapping subproblems to optimize calculations
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Resource Optimization:</h4>
            <div className="bg-background/50 p-4 rounded text-sm">
              <div>Capacity: 50kg</div>
              {knapsackItems.map((item, i) => (
                <div key={i} className="mt-1">
                  {item.item}: {item.weight}kg, Value: {item.value}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum value selection within weight constraints
            </p>
          </div>
        </div>
      </div>

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">💡 THE FINAL CLUE</h3>
        <div className="space-y-3">
          <div className="bg-sus-warning/10 border border-sus-warning/30 p-4 rounded-lg">
            <h4 className="font-semibold text-sus-warning mb-2">TECHNIQUE IDENTIFIED:</h4>
            <ul className="text-sm space-y-1">
              <li>• Breaks complex problems into smaller subproblems</li>
              <li>• Stores solutions to avoid recomputation</li>
              <li>• Uses memoization or tabulation</li>
              <li>• Optimal for overlapping subproblems</li>
            </ul>
          </div>
          
          <p className="text-muted-foreground text-sm">
            The impostor used this algorithmic approach to efficiently plan their sabotage. 
            What is this optimization technique called?
          </p>
        </div>
      </div>

      {!isCompleted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Optimization Technique:</label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the programming technique..."
              className="sus-input"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !answer.trim()}
            className="sus-button w-full"
          >
            {isSubmitting ? "FINALIZING CASE..." : "CLOSE THE CASE"}
          </Button>
        </form>
      )}

      <div className="text-center">
        <div className="sus-progress-indicator">
          <span className="text-sus-accent">FINAL LEVEL</span>
          <span className="text-muted-foreground">7 / 7</span>
        </div>
      </div>
    </div>
  );
};