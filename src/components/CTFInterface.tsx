import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LevelOne } from "./levels/LevelOne";
import { LevelTwo } from "./levels/LevelTwo";
import { LevelThree } from "./levels/LevelThree";
import { LevelFour } from "./levels/LevelFour";
import { VictoryScreen } from "./VictoryScreen";
import { CheckCircle, Lock, AlertTriangle } from "lucide-react";

interface LevelStatus {
  completed: boolean;
  unlocked: boolean;
  answer?: string;
}

export const CTFInterface = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levels, setLevels] = useState<Record<number, LevelStatus>>({
    1: { completed: false, unlocked: true },
    2: { completed: false, unlocked: false },
    3: { completed: false, unlocked: false },
    4: { completed: false, unlocked: false },
  });
  const [showVictory, setShowVictory] = useState(false);

  const levelAnswers = {
    1: "LINKED LIST",
    2: "HASH TABLE", 
    3: "MERGE SORT",
    4: "ARJUN"
  };

  const handleLevelComplete = (level: number, answer: string) => {
    if (levelAnswers[level as keyof typeof levelAnswers].toLowerCase() === answer.toLowerCase()) {
      const newLevels = { ...levels };
      newLevels[level] = { completed: true, unlocked: true, answer };
      
      // Unlock next level
      if (level < 4) {
        newLevels[level + 1] = { completed: false, unlocked: true };
      }
      
      setLevels(newLevels);
      
      // Check if all levels completed
      if (level === 4) {
        setTimeout(() => setShowVictory(true), 1000);
      }
      
      return true;
    }
    return false;
  };

  const getLevelIcon = (level: number) => {
    const status = levels[level];
    if (status.completed) return <CheckCircle className="w-5 h-5 text-accent" />;
    if (!status.unlocked) return <Lock className="w-5 h-5 text-muted-foreground" />;
    return <AlertTriangle className="w-5 h-5 text-sus-warning" />;
  };

  if (showVictory) {
    return <VictoryScreen />;
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 stars-bg opacity-40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">SUSSCAPE INVESTIGATION</h1>
          <p className="text-muted-foreground font-mono">EVIDENCE PROCESSING IN PROGRESS...</p>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[1, 2, 3, 4].map((level) => {
            const status = levels[level];
            const isActive = currentLevel === level;
            
            return (
              <button
                key={level}
                onClick={() => status.unlocked && setCurrentLevel(level)}
                disabled={!status.unlocked}
                className={`
                  sus-tab flex items-center gap-2
                  ${isActive ? 'active' : ''}
                  ${status.completed ? 'completed' : ''}
                `}
              >
                {getLevelIcon(level)}
                <span>Level {level}</span>
                <span className="text-xs opacity-75">
                  {level === 1 && "Linked List"}
                  {level === 2 && "Hashing"}
                  {level === 3 && "Sorting"}
                  {level === 4 && "Graph"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-muted rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-neon h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(Object.values(levels).filter(l => l.completed).length / 4) * 100}%` 
            }}
          ></div>
        </div>

        {/* Level Content */}
        <div className="sus-card animate-slide-in-up">
          {currentLevel === 1 && (
            <LevelOne 
              onComplete={(answer) => handleLevelComplete(1, answer)}
              isCompleted={levels[1].completed}
            />
          )}
          {currentLevel === 2 && (
            <LevelTwo 
              onComplete={(answer) => handleLevelComplete(2, answer)}
              isCompleted={levels[2].completed}
            />
          )}
          {currentLevel === 3 && (
            <LevelThree 
              onComplete={(answer) => handleLevelComplete(3, answer)}
              isCompleted={levels[3].completed}
            />
          )}
          {currentLevel === 4 && (
            <LevelFour 
              onComplete={(answer) => handleLevelComplete(4, answer)}
              isCompleted={levels[4].completed}
            />
          )}
        </div>
      </div>
    </div>
  );
};