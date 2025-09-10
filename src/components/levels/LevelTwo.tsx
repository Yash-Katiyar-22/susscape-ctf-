import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, Database, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
      toast({
        title: "Level 2 Complete!",
        description: "Hash collision detected. Level 3 unlocked.",
        className: "bg-accent text-accent-foreground",
      });
      setAnswer("");
    } else {
      toast({
        title: "Access Denied",
        description: "Hash verification failed. Recalculate and try again.",
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
          <Hash className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-primary">Level 2: Hashing</h2>
            <p className="text-muted-foreground">Cryptographic Evidence Analysis</p>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse" />
        )}
      </div>

      {/* Investigation briefing */}
      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-sus-warning mb-2">
          <Database className="w-4 h-4" />
          <span className="font-bold">EVIDENCE LOG #002</span>
        </div>
        <p className="text-foreground">
          The impostor's digital fingerprints have been discovered in the ship's database system.
          They used a specific data structure for rapid lookups and storage. 
          Analyze the evidence to identify the data structure.
        </p>
      </div>

      {/* Hash analysis display */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Database Access Log:</h3>
        
        <div className="space-y-4">
          {/* Hash table evidence */}
          <div className="bg-input rounded-lg p-4 font-mono text-sm">
            <div className="text-primary mb-2">$ system_analysis --data-structures</div>
            <div className="text-green-400">
              [INFO] Analyzing access patterns...
            </div>
            <div className="text-foreground mt-2">
              &gt; O(1) average lookup time detected<br/>
              &gt; Key-value pair storage system identified<br/>
              &gt; Hash function collision handling present<br/>
              &gt; Bucket-based organization confirmed
            </div>
          </div>

          {/* Code evidence */}
          <div className="bg-input rounded-lg p-4 font-mono text-sm">
            <div className="text-primary mb-2">Suspicious Code Fragment:</div>
            <div className="text-yellow-400">
              {`function suspiciousLookup(key) {`}<br/>
              {`  const index = hashFunction(key) % buckets.length;`}<br/>
              {`  return buckets[index].find(item => item.key === key);`}<br/>
              {`}`}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card/50 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Performance Profile:</h4>
          <ul className="text-sm font-mono space-y-1">
            <li className="text-accent">✓ O(1) average insertion</li>
            <li className="text-accent">✓ O(1) average retrieval</li>
            <li className="text-accent">✓ O(1) average deletion</li>
            <li className="text-sus-warning">⚠ O(n) worst case (collisions)</li>
          </ul>
        </div>
        
        <div className="bg-card/50 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Structure Analysis:</h4>
          <ul className="text-sm font-mono space-y-1">
            <li className="text-foreground">• Key-value mapping</li>
            <li className="text-foreground">• Hash function based</li>
            <li className="text-foreground">• Collision resolution</li>
            <li className="text-foreground">• Dynamic resizing</li>
          </ul>
        </div>
      </div>

      {/* Hint section */}
      {!isCompleted && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Investigation Notes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 font-mono">
            <li>&gt; Data structure optimized for key-based lookups</li>
            <li>&gt; Uses mathematical function for index calculation</li>
            <li>&gt; Common in database implementations and caches</li>
            <li>&gt; Answer format: TWO WORDS (data structure name)</li>
          </ul>
        </div>
      )}

      {/* Solution display for completed level */}
      {isCompleted && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <h4 className="font-semibold text-accent mb-2">✓ SOLVED</h4>
          <p className="font-mono text-sm">
            Data structure identified: HASH TABLE - Used for O(1) key-value operations
          </p>
        </div>
      )}

      {/* Answer input */}
      {!isCompleted && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Identify the data structure:
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
            {isSubmitting ? 'ANALYZING...' : 'SUBMIT ANALYSIS'}
          </Button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="text-center font-mono text-xs text-muted-foreground">
        LEVEL 2/4 • {isCompleted ? 'COMPLETE' : 'IN PROGRESS'}
      </div>
    </div>
  );
};