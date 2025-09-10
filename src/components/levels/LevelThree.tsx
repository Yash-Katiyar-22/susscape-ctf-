import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import yellowDetective from "@/assets/yellow-detective.png";

interface LevelThreeProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelThree = ({ onComplete, isCompleted }: LevelThreeProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timestamps = [
    { time: "23:45:12", location: "Electrical", crewmate: "Red" },
    { time: "23:42:08", location: "Medbay", crewmate: "Blue" },
    { time: "23:47:33", location: "Navigation", crewmate: "Green" },
    { time: "23:41:55", location: "Security", crewmate: "Yellow" },
    { time: "23:46:21", location: "Reactor", crewmate: "Purple" },
    { time: "23:43:17", location: "Admin", crewmate: "Orange" },
    { time: "23:44:09", location: "Weapons", crewmate: "Pink" },
    { time: "23:48:14", location: "Shields", crewmate: "Cyan" },
  ];

  const sortedTimestamps = [...timestamps].sort((a, b) => a.time.localeCompare(b.time));

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onComplete(answer);
    
    if (success) {
      toast.success("Timeline reconstructed! Moving to next level...");
      setAnswer("");
    } else {
      toast.error("Incorrect algorithm. Review the sorting pattern.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={yellowDetective} alt="Timeline Analysis" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 3: TIMELINE RECONSTRUCTION</h2>
          <p className="text-muted-foreground">Temporal data analysis required</p>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse ml-auto" />
        )}
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ SOLVED</span>
            <span className="text-muted-foreground">Timeline successfully reconstructed</span>
          </div>
        </div>
      )}

      {/* Investigation briefing */}
      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-sus-warning mb-2">
          <Clock className="w-4 h-4" />
          <span className="font-bold">EVIDENCE LOG #003</span>
        </div>
        <p className="text-foreground">
          Security footage timestamps from various ship locations have been scrambled.
          The impostor used a sophisticated sorting algorithm to organize their alibi timeline.
          Identify the algorithm used to reconstruct the evidence chronologically.
        </p>
      </div>

      {/* Timeline data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scrambled data */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-4">Raw Security Data:</h3>
          <div className="space-y-2">
            {timestamps.map((entry, index) => (
              <div key={index} className="bg-input rounded p-3 font-mono text-sm flex justify-between items-center">
                <span className="text-sus-warning">{entry.time}</span>
                <span className="text-foreground">{entry.location}</span>
                <span className="text-primary">{entry.crewmate}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground font-mono">
            Status: UNSORTED • Chronological order required
          </div>
        </div>

        {/* Sorted preview */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-4">Reconstructed Timeline:</h3>
          <div className="space-y-2">
            {sortedTimestamps.map((entry, index) => (
              <div key={index} className="bg-accent/10 border border-accent/30 rounded p-3 font-mono text-sm flex justify-between items-center">
                <span className="text-accent font-bold">{entry.time}</span>
                <span className="text-foreground">{entry.location}</span>
                <span className="text-primary">{entry.crewmate}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-accent font-mono">
            Status: SORTED • O(n log n) complexity detected
          </div>
        </div>
      </div>

      {/* Algorithm analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Algorithm Footprint Analysis:</h3>
        
        <div className="bg-input rounded-lg p-4 font-mono text-sm mb-4">
          <div className="text-primary mb-2">$ forensics_analyzer --trace-algorithm</div>
          <div className="text-green-400">
            [INFO] Analyzing sorting pattern...
          </div>
          <div className="text-foreground mt-2">
            &gt; Divide-and-conquer approach detected<br/>
            &gt; Recursive partitioning observed<br/>
            &gt; O(n log n) time complexity confirmed<br/>
            &gt; Stable sorting behavior identified<br/>
            &gt; Memory usage: O(n) auxiliary space
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-accent">O(n log n)</div>
            <div className="text-xs text-muted-foreground">Time Complexity</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-primary">Stable</div>
            <div className="text-xs text-muted-foreground">Sort Property</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-sus-warning">Divide</div>
            <div className="text-xs text-muted-foreground">Strategy Type</div>
          </div>
        </div>
      </div>

      {/* Hint section */}
      {!isCompleted && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Investigation Notes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 font-mono">
            <li>&gt; Classic divide-and-conquer sorting algorithm</li>
            <li>&gt; Splits data in half recursively</li>
            <li>&gt; Merges sorted halves back together</li>
            <li>&gt; Answer format: TWO WORDS (algorithm name)</li>
          </ul>
        </div>
      )}

      {/* Solution display for completed level */}
      {isCompleted && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <h4 className="font-semibold text-accent mb-2">✓ SOLVED</h4>
          <p className="font-mono text-sm">
            Algorithm identified: MERGE SORT - Divide-and-conquer with O(n log n) complexity
          </p>
        </div>
      )}

      {!isCompleted && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Sorting Algorithm:</label>
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
            {isSubmitting ? "RECONSTRUCTING..." : "SUBMIT TIMELINE"}
          </Button>
        </form>
      )}

      <div className="text-center">
        <div className="sus-progress-indicator">
          <span className="text-sus-accent">LEVEL 3</span>
          <span className="text-muted-foreground">/ 7</span>
        </div>
      </div>
    </div>
  );
};