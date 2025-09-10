import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Eye, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LevelOneProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelOne = ({ onComplete, isCompleted }: LevelOneProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate processing delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onComplete(answer);
    
    if (success) {
      toast({
        title: "Level 1 Complete!",
        description: "Cipher decoded successfully. Level 2 unlocked.",
        className: "bg-accent text-accent-foreground",
      });
      setAnswer("");
    } else {
      toast({
        title: "Incorrect Answer",
        description: "The cipher remains unsolved. Try again.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Level header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-primary">Level 1: Linked List</h2>
            <p className="text-muted-foreground">Data Structure Investigation</p>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse" />
        )}
      </div>

      {/* Investigation briefing */}
      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-sus-warning mb-2">
          <Eye className="w-4 h-4" />
          <span className="font-bold">EVIDENCE LOG #001</span>
        </div>
        <p className="text-foreground">
          A suspicious data structure has been discovered at the crime scene. 
          The impostor has left behind an encrypted message using a simple Caesar cipher.
          Decode the message to identify the data structure used in their alibi.
        </p>
      </div>

      {/* Cipher display */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Intercepted Message:</h3>
        <div className="bg-input rounded-lg p-4 font-mono text-xl text-center tracking-widest">
          <span className="text-primary">OLQNHG OLVW</span>
        </div>
        <div className="mt-4 text-sm text-muted-foreground font-mono">
          &gt; Shift cipher detected. Key analysis required.
        </div>
      </div>

      {/* Hint section */}
      {!isCompleted && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Investigation Notes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 font-mono">
            <li>&gt; Caesar cipher shift pattern detected</li>
            <li>&gt; Try shifting each letter backwards in the alphabet</li>
            <li>&gt; Focus on common data structure terminology</li>
            <li>&gt; Answer format: TWO WORDS (data structure name)</li>
          </ul>
        </div>
      )}

      {/* Solution display for completed level */}
      {isCompleted && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <h4 className="font-semibold text-accent mb-2">✓ SOLVED</h4>
          <p className="font-mono text-sm">
            Cipher decoded: OLQNHG OLVW → LINKED LIST (Caesar cipher, shift of 2)
          </p>
        </div>
      )}

      {/* Answer input */}
      {!isCompleted && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter the decoded message:
            </label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the data structure name..."
              className="sus-input font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
            className={`w-full font-bold ${
              isSubmitting 
                ? 'bg-sus-warning text-black animate-pulse' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground sus-glow-primary'
            }`}
          >
            {isSubmitting ? 'PROCESSING...' : 'SUBMIT EVIDENCE'}
          </Button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="text-center font-mono text-xs text-muted-foreground">
        LEVEL 1/4 • {isCompleted ? 'COMPLETE' : 'IN PROGRESS'}
      </div>
    </div>
  );
};