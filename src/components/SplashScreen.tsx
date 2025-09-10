import { Button } from "@/components/ui/button";
import { Zap, Users, Shield } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 stars-bg opacity-60"></div>
      
      {/* Central content */}
      <div className="relative z-10 text-center animate-slide-in-up">
        <div className="sus-card max-w-2xl mx-auto">
          {/* Emergency icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-16 h-16 text-secondary animate-glow-pulse" />
              <div className="absolute -top-2 -right-2">
                <Zap className="w-8 h-8 text-sus-warning animate-bounce" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
            SUSSCAPE
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-3xl font-semibold text-secondary mb-4">
            The Digital Alibi
          </h2>
          
          {/* Tagline */}
          <p className="text-xl text-muted-foreground mb-8 font-mono">
            &gt; Can you decode the truth? 
            <span className="animate-pulse text-primary">_</span>
          </p>

          {/* Investigation status */}
          <div className="bg-muted rounded-lg p-4 mb-8 font-mono text-sm">
            <div className="flex items-center justify-between text-green-400">
              <span>EMERGENCY MEETING CALLED</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-sus-warning mt-2">
              IMPOSTOR DETECTED - INVESTIGATION REQUIRED
            </div>
            <div className="text-primary mt-1">
              4 LEVELS OF EVIDENCE TO PROCESS
            </div>
          </div>

          {/* Start button */}
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl sus-glow-primary hover:scale-105 transition-all duration-300"
          >
            START INVESTIGATION
          </Button>

          {/* Warning message */}
          <p className="text-xs text-muted-foreground mt-4 font-mono">
            WARNING: ONLY PROCEED IF YOU'RE READY TO UNCOVER THE TRUTH
          </p>
        </div>
      </div>

      {/* Floating crewmate silhouettes (decorative) */}
      <div className="absolute top-20 left-20 w-12 h-12 rounded-full bg-primary/20 animate-bounce"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 rounded-full bg-accent/20 animate-bounce delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-secondary/30 animate-bounce delay-500"></div>
    </div>
  );
};