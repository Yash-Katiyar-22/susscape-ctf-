import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import yellowDetective from "@/assets/yellow-detective.png";

interface LevelSixProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelSix = ({ onComplete, isCompleted }: LevelSixProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathData = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "D", weight: 8 },
    { from: "C", to: "E", weight: 10 },
    { from: "D", to: "E", weight: 2 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onComplete(answer.trim());
    
    if (success) {
      toast.success("Pathfinding algorithm identified! Final level unlocked...");
    } else {
      toast.error("Incorrect algorithm. Review the shortest path requirements.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={yellowDetective} alt="Investigating" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 6: ESCAPE ROUTE ANALYSIS</h2>
          <p className="text-muted-foreground">Emergency pathfinding system compromised</p>
        </div>
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ SOLVED</span>
            <span className="text-muted-foreground">Pathfinding algorithm reconstructed</span>
          </div>
        </div>
      )}

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">🗺️ STATION LAYOUT RECOVERED</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Navigation Network:</h4>
            <div className="bg-background/50 p-4 rounded">
              <svg viewBox="0 0 300 200" className="w-full h-32">
                <circle cx="50" cy="50" r="15" fill="hsl(var(--primary))" />
                <text x="50" y="55" textAnchor="middle" className="fill-background text-xs">A</text>
                
                <circle cx="150" cy="30" r="15" fill="hsl(var(--primary))" />
                <text x="150" y="35" textAnchor="middle" className="fill-background text-xs">B</text>
                
                <circle cx="100" cy="100" r="15" fill="hsl(var(--primary))" />
                <text x="100" y="105" textAnchor="middle" className="fill-background text-xs">C</text>
                
                <circle cx="200" cy="100" r="15" fill="hsl(var(--primary))" />
                <text x="200" y="105" textAnchor="middle" className="fill-background text-xs">D</text>
                
                <circle cx="250" cy="150" r="15" fill="hsl(var(--accent))" />
                <text x="250" y="155" textAnchor="middle" className="fill-background text-xs">E</text>
                
                {/* Edges */}
                <line x1="50" y1="50" x2="150" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="50" y1="50" x2="100" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="150" y1="30" x2="100" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="150" y1="30" x2="200" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="100" y1="100" x2="200" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="100" y1="100" x2="250" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                <line x1="200" y1="100" x2="250" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sus-accent">Distance Matrix:</h4>
            <div className="bg-background/50 p-4 rounded font-mono text-sm">
              <div>A→B: 4, A→C: 2</div>
              <div>B→C: 1, B→D: 5</div>
              <div>C→D: 8, C→E: 10</div>
              <div>D→E: 2</div>
            </div>
            <p className="text-xs text-muted-foreground">
              Emergency exit E must be reached from point A via shortest path
            </p>
          </div>
        </div>
      </div>

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-3">⚡ ALGORITHM SIGNATURE</h3>
        <div className="space-y-2 text-sm">
          <p>• Greedy approach for shortest paths</p>
          <p>• Works with weighted graphs</p>
          <p>• Named after a Dutch computer scientist</p>
          <p>• Uses priority queue for efficiency</p>
        </div>
      </div>

      {!isCompleted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Pathfinding Algorithm:</label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the algorithm name..."
              className="sus-input"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !answer.trim()}
            className="sus-button w-full"
          >
            {isSubmitting ? "PROCESSING..." : "SUBMIT ANALYSIS"}
          </Button>
        </form>
      )}

      <div className="text-center">
        <div className="sus-progress-indicator">
          <span className="text-sus-accent">LEVEL 6</span>
          <span className="text-muted-foreground">/ 7</span>
        </div>
      </div>
    </div>
  );
};