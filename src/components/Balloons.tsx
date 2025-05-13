
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

  const actualCount = showMany ? count : Math.min(count, 4);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: actualCount }).map((_, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random() * 60 - 30; // -30 to 30, reduced range for more natural movement
        const randomDelay = Math.random() * 8; // Increased delay variation
        const randomDuration = 15 + Math.random() * 20; // Randomized duration between 15-35s
        const randomLeft = Math.random() * 80 + 10; // 10% to 90% from left
        const isPopped = poppedBalloons.includes(index);
        
        return (
          <div
            key={index}
            className={`balloon pointer-events-auto cursor-pointer ${randomColor} ${
              isPopped ? 'animate-pop' : ''
            }`}
            style={{
              left: `${randomLeft}%`,
              '--balloon-x': `${randomX}px`,
              '--delay': `${randomDelay}s`,
              '--duration': `${randomDuration}s`,
              opacity: isPopped ? 0 : 1,
              animation: isPopped ? 'pop 0.3s ease-out forwards' : `float-balloon ${randomDuration}s ease-in-out ${randomDelay}s infinite`,
            } as React.CSSProperties}
            onClick={() => handlePopBalloon(index)}
          />
        );
      })}
    </div>
  );
};

export default Balloons;
