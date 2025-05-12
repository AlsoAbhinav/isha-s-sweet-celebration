
import React, { useState, useEffect } from 'react';

interface MessageCardProps {
  name: string;
  message?: string;
  onCardOpen?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ 
  name,
  message = "I hope your day is filled with joy, laughter, and all the things that make you happy. You're amazing and deserve the best birthday ever!",
  onCardOpen 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<Array<{ top: number; left: number; size: number; delay: number }>>([]);
  
  const handleClick = () => {
    setIsOpen(prev => !prev);
    
    if (!isOpen && onCardOpen) {
      onCardOpen();
    }
    
    if (!isOpen) {
      // Create floating hearts when card opens
      const newHearts = Array.from({ length: 15 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2,
      }));
      setHearts(newHearts);
    } else {
      setHearts([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`birthday-card overflow-hidden transition-all duration-500 relative ${
          isOpen ? 'h-96' : 'h-40'
        }`}
        onClick={handleClick}
      >
        {/* Card cover */}
        <div 
          className={`absolute inset-0 bg-birthday-purple p-6 flex flex-col items-center justify-center transition-transform duration-500 ${
            isOpen ? 'transform -translate-y-full' : ''
          }`}
        >
          <h2 className="text-2xl font-birthday text-white mb-2">Happy Birthday!</h2>
          <h3 className="text-xl text-white font-semibold">{name}</h3>
          <p className="text-white/70 mt-2 text-center">
            {isOpen ? '' : 'Click to open your card'}
          </p>
        </div>
        
        {/* Card inside */}
        <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {hearts.map((heart, index) => (
              <div
                key={index}
                className="absolute text-2xl animate-float text-primary"
                style={{
                  top: `${heart.top}%`,
                  left: `${heart.left}%`,
                  fontSize: `${heart.size}px`,
                  animationDelay: `${heart.delay}s`,
                }}
              >
                ❤️
              </div>
            ))}
            
            <h2 className="text-3xl font-birthday text-primary animate-heart-beat mb-4">Happy 22nd Birthday!</h2>
            <p className="text-center text-gray-700 leading-relaxed">
              {message}
            </p>
            <div className="mt-6 text-xl font-birthday text-primary">With love ❤️</div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        {isOpen ? 'Click to close' : 'Click to open'}
      </p>
    </div>
  );
};

export default MessageCard;
