
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  count?: number;
  active?: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ count = 120, active = true }) => {
  const [confetti, setConfetti] = useState<Array<{ left: number; delay: number; color: string; size: number; rotation: number; shape: string }>>([]);

  useEffect(() => {
    if (active) {
      // Create confetti with a staggered appearance for more natural effect
      const newConfetti = Array.from({ length: count }).map((_, index) => ({
        left: Math.random() * 100,
        delay: Math.min((index / count) * 2, 1) + Math.random() * 0.5, // Staggered but not too delayed
        color: getRandomColor(),
        size: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 - smaller pieces
        rotation: Math.random() * 360,
        shape: getRandomShape()
      }));
      
      setConfetti(newConfetti);
    } else {
      setConfetti([]);
    }
  }, [count, active]);

  const getRandomColor = () => {
    const colors = [
      'bg-birthday-pink',
      'bg-birthday-blue',
      'bg-birthday-purple',
      'bg-birthday-yellow',
      'bg-birthday-peach',
      'bg-birthday-green',
      'bg-birthday-gold',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomShape = () => {
    const shapes = ['rounded-full', 'rounded-sm', 'star', 'heart'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {confetti.map((conf, index) => {
        const shape = conf.shape;
        
        // Calculate fall duration - vary it slightly for more natural effect
        const fallDuration = 3 + Math.random() * 2;
        
        return (
          <div
            key={index}
            className={`confetti ${conf.color} animate-confetti-fall`}
            style={{
              left: `${conf.left}%`,
              width: shape === 'star' || shape === 'heart' ? '10px' : `${6 + (conf.size * 6)}px`,
              height: shape === 'star' || shape === 'heart' ? '10px' : `${6 + (conf.size * 6)}px`,
              transform: `scale(${conf.size}) rotate(${conf.rotation}deg)`,
              opacity: 0.8 + (conf.size * 0.2),
              animationDelay: `${conf.delay}s`,
              animationDuration: `${fallDuration}s`,
              borderRadius: shape === 'rounded-full' ? '50%' : 
                           shape === 'rounded-sm' ? '3px' : '0',
              clipPath: shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                        shape === 'heart' ? 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' :
                        'none'
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
