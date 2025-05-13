
import React, { useState, useEffect } from 'react';
import Balloons from '@/components/Balloons';
import Confetti from '@/components/Confetti';
import MessageCard from '@/components/MessageCard';
import BirthdayCake from '@/components/BirthdayCake';
import Gallery from '@/components/Gallery';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showManyBalloons, setShowManyBalloons] = useState(false);
  const [message, setMessage] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [birthdayWishes, setBirthdayWishes] = useState<string[]>([
    "May all your wishes come true!",
    "You're amazing and beautiful!",
    "Hope your day is as special as you are!"
  ]);
  const { toast } = useToast();
  
  useEffect(() => {
    // No initial confetti or typing animation until candles are blown
    // The page starts with only the cake visible
  }, []);
  
  const handleCandlesBlow = () => {
    setShowConfetti(true);
    setShowManyBalloons(true);
    setShowContent(true); // Show all content after candles are blown
    
    // Start typing animation after candles are blown
    const fullMessage = "Happy 22nd Birthday, Isha! 🎂✨";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < fullMessage.length) {
        setMessage(prev => prev + fullMessage.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };
  
  const handleCardOpen = () => {
    setShowConfetti(true);
    // Hide confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };
  
  const handleAddWish = () => {
    const wishes = [
      "Hope your day is filled with laughter!",
      "Sending you lots of love on your birthday!",
      "Wishing you the happiest birthday ever!",
      "May your day be as wonderful as you are!",
      "Cheers to another amazing year!",
      "You deserve all the happiness in the world!",
      "Stay cute and amazing, birthday girl!"
    ];
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    if (!birthdayWishes.includes(randomWish)) {
      setBirthdayWishes(prev => [randomWish, ...prev]);
      
      toast({
        title: "New Birthday Wish Added!",
        description: randomWish,
        duration: 3000,
      });
    } else {
      handleAddWish(); // Try again with a different wish
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-birthday-pink/40 to-white">
      <Balloons count={showManyBalloons ? 20 : 4} showMany={showManyBalloons} />
      {showConfetti && <Confetti count={150} />}
      
      <header className={`pt-20 pb-16 text-center relative overflow-hidden ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-birthday-purple/30 to-transparent z-[-1]" />
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-birthday text-primary animate-float mb-6 px-4 drop-shadow-sm">
          {message || "Happy Birthday!"}
        </h1>
        <p className="text-xl sm:text-2xl text-accent-foreground animate-fade-in opacity-0 px-4 font-cute" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          Today is all about you!
        </p>
      </header>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-24">
            <div className="glass-card">
              <BirthdayCake onCandlesBlow={handleCandlesBlow} />
            </div>
          </section>
          
          {showContent && (
            <>
              <section className="mb-24 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <MessageCard name="Isha" onCardOpen={handleCardOpen} />
              </section>
              
              <section className="mb-24 animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="glass-card">
                  <Gallery title="Cherished Moments" />
                </div>
              </section>
              
              <section className="mb-24 animate-fade-in" style={{ animationDelay: '1.5s' }}>
                <div className="rounded-2xl p-8 shadow-lg bg-gradient-to-br from-white/90 to-birthday-blue/30 backdrop-blur-sm">
                  <h2 className="text-3xl md:text-4xl font-birthday text-center mb-8 text-primary drop-shadow-sm">Birthday Wishes</h2>
                  
                  <div className="space-y-6 mb-8">
                    {birthdayWishes.map((wish, index) => (
                      <div 
                        key={index} 
                        className="p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm animate-fade-in border border-birthday-purple/20"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <p className="text-center font-cute text-gray-700">"{wish}"</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleAddWish}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-2 text-base rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      Add a Birthday Wish 🎁
                    </Button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      
      <footer className="text-center py-12 text-sm bg-gradient-to-t from-birthday-purple/30 to-transparent">
        <p className="animate-sway inline-block font-birthday text-base mb-2 flex items-center justify-center">
          Made with <Heart className="h-4 w-4 fill-red-500 text-red-500 mx-1" /> by Abhinav for Isha's 22nd Birthday
        </p>
        <p className="text-gray-600 font-cute text-sm">
          May all your wishes come true! ✨
        </p>
      </footer>
    </div>
  );
};

export default Index;
