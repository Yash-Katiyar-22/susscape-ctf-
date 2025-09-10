import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Eye, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import blueCrewmate from "@/assets/blue-crewmate.png";

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
      toast.success("Cipher decoded! Moving to next level...");
      setAnswer("");
    } else {
      toast.error("Incorrect cipher. Try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Level header */}
      <div className="flex items-center gap-4 mb-6">
        <img src={blueCrewmate} alt="Investigating" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-primary">LEVEL 1: CIPHER DECRYPTION</h2>
          <p className="text-muted-foreground">Encrypted transmission intercepted</p>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse ml-auto" />
        )}
      </div>

      {isCompleted && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">✓ SOLVED</span>
            <span className="text-muted-foreground">Message successfully decrypted</span>
          </div>
        </div>
      )}

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-4">📡 INTERCEPTED TRANSMISSION</h3>
        <div className="bg-background/50 p-4 rounded font-mono text-sm">
          <span className="text-sus-accent">[ENCRYPTED MESSAGE DETECTED]</span><br />
          <span className="text-muted-foreground">From: Unknown Source</span><br />
          <span className="text-muted-foreground">To: Emergency Systems</span><br />
          <span className="text-muted-foreground">Priority: HIGH</span><br /><br />
          <span className="text-primary font-semibold text-xl">OLQNHG OLVW</span>
        </div>
      </div>

      <div className="sus-evidence-log">
        <h3 className="text-lg font-semibold text-primary mb-3">🔍 CIPHER ANALYSIS</h3>
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-sus-accent font-medium">Pattern:</span> Simple substitution detected
          </div>
          <div className="text-sm">
            <span className="text-sus-accent font-medium">Method:</span> Each letter shifted by fixed amount
          </div>
          <p className="text-muted-foreground text-sm">
            The impostor used a classic encryption method. Analyze the shift pattern to decode the message.
          </p>
        </div>
      </div>

      {!isCompleted && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Decoded Message:</label>
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
            {isSubmitting ? "DECRYPTING..." : "SUBMIT EVIDENCE"}
          </Button>
        </form>
      )}

      <div className="text-center">
        <div className="sus-progress-indicator">
          <span className="text-sus-accent">LEVEL 1</span>
          <span className="text-muted-foreground">/ 7</span>
        </div>
      </div>
    </div>
  );
};