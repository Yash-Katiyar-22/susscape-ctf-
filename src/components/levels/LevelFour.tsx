import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LevelFourProps {
  onComplete: (answer: string) => boolean;
  isCompleted: boolean;
}

export const LevelFour = ({ onComplete, isCompleted }: LevelFourProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const familyData = {
    "MAYA": { 
      connections: ["ARJUN", "PRIYA"], 
      info: "Sister of Arjun, Friend of Priya",
      alibi: "Was in Cafeteria during incident"
    },
    "ARJUN": { 
      connections: ["MAYA", "ROHIT", "KAVYA"], 
      info: "Brother of Maya, Friend of Rohit and Kavya",
      alibi: "Claims to be in Electrical - SUSPICIOUS TIMING"
    },
    "PRIYA": { 
      connections: ["MAYA", "ROHIT"], 
      info: "Friend of Maya and Rohit",
      alibi: "Confirmed in Medbay with witnesses"
    },
    "ROHIT": { 
      connections: ["ARJUN", "PRIYA", "KAVYA"], 
      info: "Friend of Arjun, Priya, and Kavya",
      alibi: "Security footage confirms Admin location"
    },
    "KAVYA": { 
      connections: ["ARJUN", "ROHIT"], 
      info: "Friend of Arjun and Rohit", 
      alibi: "Multiple witnesses confirm Navigation presence"
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = onComplete(answer);
    
    if (success) {
      toast({
        title: "CASE SOLVED!",
        description: "Impostor identified! Investigation complete.",
        className: "bg-accent text-accent-foreground",
      });
      setAnswer("");
    } else {
      toast({
        title: "Incorrect Suspect",
        description: "Graph analysis incomplete. Review the connections.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const getNodeColor = (person: string) => {
    if (person === "ARJUN") return "bg-secondary border-secondary text-secondary-foreground";
    if (selectedNode === person) return "bg-primary border-primary text-primary-foreground";
    return "bg-card border-border text-foreground hover:bg-primary/20";
  };

  return (
    <div className="space-y-6">
      {/* Level header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-primary">Level 4: Graph Theory</h2>
            <p className="text-muted-foreground">Final Investigation - Social Network Analysis</p>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle className="w-8 h-8 text-accent animate-glow-pulse" />
        )}
      </div>

      {/* Investigation briefing */}
      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-sus-emergency mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-bold">FINAL EVIDENCE LOG #004</span>
        </div>
        <p className="text-foreground">
          This is it! The final piece of evidence. Analyze the social network graph of all crewmates
          aboard the ship. Cross-reference their alibis with their connections and movement patterns.
          One person's alibi doesn't match their claimed location. Find the impostor!
        </p>
      </div>

      {/* Interactive family graph */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          <Network className="w-5 h-5" />
          Social Network Graph - Click nodes to investigate
        </h3>
        
        {/* Graph visualization */}
        <div className="relative bg-input rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          {/* Connections (edges) */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {/* Maya-Arjun */}
            <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            {/* Maya-Priya */}
            <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            {/* Arjun-Rohit */}
            <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            {/* Arjun-Kavya */}
            <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            {/* Priya-Rohit */}
            <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            {/* Rohit-Kavya */}
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
          </svg>

          {/* Nodes */}
          <div className="relative w-full h-full" style={{ zIndex: 2 }}>
            {/* Maya - top left */}
            <button
              onClick={() => setSelectedNode(selectedNode === "MAYA" ? null : "MAYA")}
              className={`absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold hover:scale-110 ${getNodeColor("MAYA")}`}
            >
              MAYA
            </button>

            {/* Arjun - top right */}
            <button
              onClick={() => setSelectedNode(selectedNode === "ARJUN" ? null : "ARJUN")}
              className={`absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold hover:scale-110 animate-pulse ${getNodeColor("ARJUN")}`}
            >
              ARJUN ⚠️
            </button>

            {/* Rohit - center */}
            <button
              onClick={() => setSelectedNode(selectedNode === "ROHIT" ? null : "ROHIT")}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold hover:scale-110 ${getNodeColor("ROHIT")}`}
            >
              ROHIT
            </button>

            {/* Priya - bottom left */}
            <button
              onClick={() => setSelectedNode(selectedNode === "PRIYA" ? null : "PRIYA")}
              className={`absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold hover:scale-110 ${getNodeColor("PRIYA")}`}
            >
              PRIYA
            </button>

            {/* Kavya - bottom right */}
            <button
              onClick={() => setSelectedNode(selectedNode === "KAVYA" ? null : "KAVYA")}
              className={`absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold hover:scale-110 ${getNodeColor("KAVYA")}`}
            >
              KAVYA
            </button>
          </div>
        </div>

        {/* Node information panel */}
        {selectedNode && (
          <div className="mt-4 bg-input rounded-lg p-4 animate-slide-in-up">
            <h4 className="font-bold text-primary mb-2">{selectedNode} - Investigation Profile</h4>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-sus-warning">Connections:</span> {familyData[selectedNode as keyof typeof familyData].connections.join(", ")}</p>
              <p><span className="text-sus-warning">Relationship:</span> {familyData[selectedNode as keyof typeof familyData].info}</p>
              <p><span className="text-sus-warning">Alibi:</span> {familyData[selectedNode as keyof typeof familyData].alibi}</p>
            </div>
          </div>
        )}
      </div>

      {/* Evidence analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card/50 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Graph Analysis:</h4>
          <ul className="text-sm font-mono space-y-1">
            <li className="text-accent">✓ 5 nodes (crewmates)</li>
            <li className="text-accent">✓ 6 edges (relationships)</li>
            <li className="text-accent">✓ Connected graph structure</li>
            <li className="text-sus-warning">⚠ 1 inconsistent alibi detected</li>
          </ul>
        </div>
        
        <div className="bg-card/50 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Alibi Verification:</h4>
          <ul className="text-sm font-mono space-y-1">
            <li className="text-accent">✓ MAYA: Cafeteria confirmed</li>
            <li className="text-accent">✓ PRIYA: Medbay with witnesses</li>
            <li className="text-accent">✓ ROHIT: Admin on security footage</li>
            <li className="text-accent">✓ KAVYA: Navigation verified</li>
            <li className="text-sus-emergency">✗ ARJUN: Electrical claim unverified</li>
          </ul>
        </div>
      </div>

      {/* Hint section */}
      {!isCompleted && (
        <div className="bg-sus-emergency/10 border border-sus-emergency/30 rounded-lg p-4">
          <h4 className="font-semibold text-sus-emergency mb-2">⚠️ CRITICAL EVIDENCE:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 font-mono">
            <li>&gt; Cross-reference movement patterns with relationships</li>
            <li>&gt; One person has access to restricted areas</li>
            <li>&gt; Their alibi timing doesn't match security footage</li>
            <li>&gt; Focus on who had opportunity AND motive</li>
          </ul>
        </div>
      )}

      {/* Solution display for completed level */}
      {isCompleted && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4">
          <h4 className="font-semibold text-accent mb-2">✓ CASE SOLVED!</h4>
          <p className="font-mono text-sm">
            IMPOSTOR IDENTIFIED: ARJUN - Graph analysis revealed inconsistent alibi and suspicious access patterns
          </p>
        </div>
      )}

      {/* Final answer input */}
      {!isCompleted && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Who is the impostor? (Enter the name of the guilty crewmate)
            </label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the impostor's name..."
              className="sus-input font-mono text-center text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
            className={`w-full font-bold text-lg py-3 ${
              isSubmitting 
                ? 'bg-sus-emergency text-white animate-emergency' 
                : 'bg-sus-emergency hover:bg-sus-emergency/90 text-white sus-glow-danger'
            }`}
          >
            {isSubmitting ? 'APPREHENDING SUSPECT...' : 'ARREST IMPOSTOR'}
          </Button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="text-center font-mono text-xs text-muted-foreground">
        LEVEL 4/4 • FINAL INVESTIGATION • {isCompleted ? 'COMPLETE' : 'IN PROGRESS'}
      </div>
    </div>
  );
};