
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface BirthdayCakeProps {
  onCandlesBlow?: () => void;
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onCandlesBlow }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blowAttempts, setBlowAttempts] = useState(0);
  const { toast } = useToast();

  const handleBlow = () => {
    if (candlesLit) {
      if (blowAttempts >= 2) {
        setCandlesLit(false);
        onCandlesBlow?.();
        
        toast({
          title: "Yay! 🎉",
          description: "You blew out the candles! Make a wish for Isha!",
          duration: 3000,
        });
      } else {
        setBlowAttempts(prev => prev + 1);
        
        toast({
          title: "Almost there!",
          description: "Keep blowing! Try a little harder!",
          duration: 2000,
        });
      }
    }
  };

  const resetCandles = () => {
    setCandlesLit(true);
    setBlowAttempts(0);
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-64 h-48 relative mb-4">
        {/* Cake base */}
        <div className="absolute bottom-0 w-full h-24 bg-birthday-peach rounded-lg"></div>
        <div className="absolute bottom-24 w-full h-12 bg-birthday-pink rounded-t-lg"></div>
        <div className="absolute bottom-36 w-full h-12 bg-birthday-peach rounded-t-lg"></div>
        
        {/* Frosting */}
        <div className="absolute bottom-36 w-full">
          <div className="flex justify-around">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="w-8 h-4 bg-white rounded-t-full"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Decorations */}
        <div className="absolute bottom-12 w-full px-4">
          <div className="flex justify-around">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-birthday-purple rounded-full"
              ></div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-24 w-full px-6">
          <div className="flex justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-birthday-blue rounded-full"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Candles */}
        <div className="absolute bottom-48 w-full px-8">
          <div className="flex justify-around">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="cake-candle">
                {candlesLit && <div className="absolute top-[-10px] left-[4px] w-0 h-0 animate-flame"></div>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Number 22 candles */}
        <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-6">
            <div className="cake-candle">
              {candlesLit && <div className="absolute top-[-10px] left-[4px] w-0 h-0 animate-flame"></div>}
            </div>
            <div className="cake-candle">
              {candlesLit && <div className="absolute top-[-10px] left-[4px] w-0 h-0 animate-flame"></div>}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleBlow}
          className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
            candlesLit ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400'
          }`}
          disabled={!candlesLit}
        >
          {candlesLit ? "Blow Candles 🌬️" : "Candles Blown Out!"}
        </button>
        
        {!candlesLit && (
          <button
            onClick={resetCandles}
            className="text-sm text-primary underline mt-2"
          >
            Light candles again
          </button>
        )}
      </div>
    </div>
  );
};

export default BirthdayCake;
