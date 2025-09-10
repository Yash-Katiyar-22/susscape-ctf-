import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { CTFInterface } from "@/components/CTFInterface";

const Index = () => {
  const [showCTF, setShowCTF] = useState(false);

  return (
    <div className="min-h-screen">
      {!showCTF ? (
        <SplashScreen onStart={() => setShowCTF(true)} />
      ) : (
        <CTFInterface />
      )}
    </div>
  );
};

export default Index;
