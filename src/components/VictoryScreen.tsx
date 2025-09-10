import { Button } from "@/components/ui/button";
import { Trophy, Users, CheckCircle, Zap } from "lucide-react";

export const VictoryScreen = () => {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 stars-bg opacity-80"></div>
      
      {/* Victory content */}
      <div className="relative z-10 text-center animate-slide-in-up">
        <div className="sus-card max-w-3xl mx-auto victory-pulse">
          {/* Victory icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="w-20 h-20 text-accent sus-glow-accent" />
              {/* Floating particles effect */}
              <div className="absolute -top-4 -left-4">
                <Zap className="w-6 h-6 text-sus-warning animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-6">
                <Zap className="w-4 h-4 text-primary animate-bounce delay-300" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Zap className="w-5 h-5 text-accent animate-bounce delay-700" />
              </div>
            </div>
          </div>

          {/* Main victory message */}
          <h1 className="text-7xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
            CASE CLOSED
          </h1>
          
          <h2 className="text-4xl font-semibold text-accent mb-6">
            CULPRIT APPREHENDED!
          </h2>

          {/* Investigation summary */}
          <div className="bg-muted rounded-xl p-6 mb-8 font-mono text-left">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-primary">INVESTIGATION SUMMARY</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4" />
                  <span>Level 1: Linked List - SOLVED</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4" />
                  <span>Level 2: Hashing - SOLVED</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4" />
                  <span>Level 3: Sorting - SOLVED</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4" />
                  <span>Level 4: Graph Theory - SOLVED</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-card rounded-lg">
              <div className="text-center">
                <div className="text-secondary text-lg font-bold mb-2">IMPOSTOR IDENTIFIED:</div>
                <div className="text-3xl font-bold text-sus-emergency">ARJUN</div>
              </div>
            </div>
          </div>

          {/* Achievement unlocked */}
          <div className="bg-primary/10 border border-primary rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Users className="w-6 h-6" />
              <span className="font-bold text-lg">ACHIEVEMENT UNLOCKED</span>
              <Users className="w-6 h-6" />
            </div>
            <div className="text-foreground mt-2 font-mono">
              "Digital Detective" - Solved all 4 levels of the Susscape investigation
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-card/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">4/4</div>
              <div className="text-sm text-muted-foreground">Levels Complete</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-sus-warning">1</div>
              <div className="text-sm text-muted-foreground">Impostor Caught</div>
            </div>
          </div>

          {/* Final message */}
          <div className="text-lg text-muted-foreground mb-6 font-mono">
            &gt; The truth has been uncovered. The impostor's digital alibi has been exposed.
            <br />
            &gt; Justice served. Mission accomplished.
          </div>

          {/* Restart button */}
          <Button
            onClick={handleRestart}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl sus-glow-accent hover:scale-105 transition-all duration-300"
          >
            NEW INVESTIGATION
          </Button>

          <p className="text-xs text-muted-foreground mt-4 font-mono">
            CONGRATULATIONS ON COMPLETING THE SUSSCAPE CTF!
          </p>
        </div>
      </div>

      {/* Celebration particles */}
      <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-accent animate-bounce"></div>
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
      <div className="absolute bottom-20 left-32 w-4 h-4 rounded-full bg-sus-warning animate-bounce delay-500"></div>
      <div className="absolute bottom-32 right-16 w-2 h-2 rounded-full bg-accent animate-bounce delay-700"></div>
      <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-primary animate-bounce delay-1000"></div>
    </div>
  );
};