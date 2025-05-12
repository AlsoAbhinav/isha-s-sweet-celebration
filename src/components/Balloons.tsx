
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface BalloonProps {
  count?: number;
  showMany?: boolean;
}

const Balloons: React.FC<BalloonProps> = ({ count = 10, showMany = false }) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const { toast } = useToast();
  
  const colors = [
    'bg-birthday-pink',
    'bg-birthday-blue',
    'bg-birthday-purple',
    'bg-birthday-yellow',
    'bg-birthday-peach',
    'bg-birthday-green',
  ];
  
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

  const actualCount = showMany ? count : Math.min(4, count);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: actualCount }).map((_, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 100 - 50; // -50 to 50
        const randomDelay = Math.random() * 5;
        const randomLeft = Math.random() * 90 + 5; // 5% to 95% from left
        const isPopped = poppedBalloons.includes(index);
        
        return (
          <div
            key={index}
            className={`balloon pointer-events-auto cursor-pointer ${randomColor} ${
              isPopped ? 'animate-pop' : 'animate-balloon-float'
            }`}
            style={{
              left: `${randomLeft}%`,
              '--balloon-x': `${randomX}px`,
              '--delay': randomDelay,
              opacity: isPopped ? 0 : 1,
            } as React.CSSProperties}
            onClick={() => handlePopBalloon(index)}
          />
        );
      })}
    </div>
  );
};

export default Balloons;
