
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  count?: number;
  active?: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ count = 100, active = true }) => {
  const [confetti, setConfetti] = useState<Array<{ left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (active) {
      const newConfetti = Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        color: getRandomColor(),
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

  const shapes = ['rounded-full', 'rounded-sm', 'rounded', 'rotate-45'];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {confetti.map((conf, index) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        return (
          <div
            key={index}
            className={`confetti ${conf.color} ${shape} animate-confetti-fall`}
            style={{
              left: `${conf.left}%`,
              '--delay': conf.delay,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
