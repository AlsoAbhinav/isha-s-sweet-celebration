
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface BalloonProps {
  count?: number;
  showMany?: boolean;
}

const Balloons: React.FC<BalloonProps> = ({ count = 10, showMany = false }) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [visibleBalloons, setVisibleBalloons] = useState<number>(0);
  const { toast } = useToast();
  
  const colors = [
    'bg-birthday-pink',
    'bg-birthday-blue',
    'bg-birthday-purple',
    'bg-birthday-yellow',
    'bg-birthday-peach',
    'bg-birthday-green',
  ];

  // Control balloon sequential appearance when showMany is toggled
  useEffect(() => {
    if (showMany) {
      let currentCount = 0;
      const totalBalloons = count;
      const interval = setInterval(() => {
        if (currentCount < totalBalloons) {
          setVisibleBalloons(prev => prev + 1);
          currentCount++;
        } else {
          clearInterval(interval);
        }
      }, 200); // Add a new balloon every 200ms for a smooth entrance
      
      return () => clearInterval(interval);
    } else {
      // Initial state - just a few balloons
      setVisibleBalloons(Math.min(count, 4));
    }
  }, [showMany, count]);
  
  const handlePopBalloon = (index: number) => {
    if (!poppedBalloons.includes(index)) {
      // Play pop sound
      const audio = new Audio('/balloon-pop.mp3');
      audio.volume = 0.3;
      audio.play().catch(err => console.log('Audio play failed:', err));
      
      setPoppedBalloons((prev) => [...prev, index]);
      
      toast({
        title: "Pop!",
        description: "You popped a birthday balloon!",
        duration: 1500,
      });
      
      // Reset the balloon after a delay
      setTimeout(() => {
        setPoppedBalloons((prev) => prev.filter(i => i !== index));
      }, 3000);
    }
  };

  // Calculate actual number of balloons to show
  const actualCount = showMany ? visibleBalloons : Math.min(count, 4);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: actualCount }).map((_, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 30 - 15; // -15 to 15, reduced for more natural movement
        const randomDuration = 20 + Math.random() * 20; // 20-40s for slower, more natural float
        const randomLeft = 10 + (index % 5) * 20 + (Math.random() * 10 - 5); // More evenly distributed
        
        // For staggered entrance, start at different bottom positions
        const initialTop = showMany ? 
          95 + (index * 2) : // Start from bottom for the animation
          Math.random() * 20; // Concentrate at top for initial display
        
        // Stagger the delay based on the index when showing many
        const randomDelay = showMany ? Math.min(index * 0.2, 5) : Math.random() * 3;
        
        const isPopped = poppedBalloons.includes(index);
        
        return (
          <div
            key={index}
            className={`balloon pointer-events-auto cursor-pointer ${randomColor} ${
              isPopped ? 'animate-pop' : ''
            }`}
            style={{
              left: `${randomLeft}%`,
              top: `${initialTop}%`,
              '--balloon-x': `${randomX}px`,
              '--delay': `${randomDelay}s`,
              '--duration': `${randomDuration}s`,
              opacity: isPopped ? 0 : 1,
              animation: isPopped ? 'pop 0.3s ease-out forwards' : 
                      showMany ? `float-natural ${randomDuration}s ease-in-out ${randomDelay}s infinite` : 
                      `float-elegant ${randomDuration}s ease-in-out ${randomDelay}s infinite`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transform: 'scale(1.05)',
            } as React.CSSProperties}
            onClick={() => handlePopBalloon(index)}
          />
        );
      })}
    </div>
  );
};

export default Balloons;
