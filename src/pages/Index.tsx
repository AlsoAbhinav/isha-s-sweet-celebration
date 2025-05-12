
import React, { useState, useEffect } from 'react';
import Balloons from '@/components/Balloons';
import Confetti from '@/components/Confetti';
import MessageCard from '@/components/MessageCard';
import BirthdayCake from '@/components/BirthdayCake';
import Gallery from '@/components/Gallery';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showManyBalloons, setShowManyBalloons] = useState(false);
  const [message, setMessage] = useState('');
  const [birthdayWishes, setBirthdayWishes] = useState<string[]>([
    "May all your wishes come true!",
    "You're amazing and beautiful!",
    "Hope your day is as special as you are!"
  ]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial confetti burst when page loads
    setTimeout(() => {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }, 1000);
    
    // Birthday messages typing effect
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
    
    return () => clearInterval(typingInterval);
  }, []);
  
  const handleCandlesBlow = () => {
    setShowConfetti(true);
    setShowManyBalloons(true);
    
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
    <div className="min-h-screen pb-20">
      <Balloons count={showManyBalloons ? 20 : 8} showMany={showManyBalloons} />
      {showConfetti && <Confetti count={150} />}
      
      <header className="pt-16 pb-12 text-center relative overflow-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-birthday text-primary animate-float mb-4 px-4">
          {message || "Happy Birthday!"}
        </h1>
        <p className="text-xl sm:text-2xl text-accent-foreground animate-fade-in opacity-0 px-4" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          Today is all about you!
        </p>
      </header>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <BirthdayCake onCandlesBlow={handleCandlesBlow} />
          </section>
          
          <section className="mb-16">
            <MessageCard name="Isha" onCardOpen={handleCardOpen} />
          </section>
          
          <section className="mb-16">
            <Gallery title="Cherished Moments" />
          </section>
          
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-3xl font-birthday text-center mb-6">Birthday Wishes</h2>
              
              <div className="space-y-4 mb-6">
                {birthdayWishes.map((wish, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-birthday-blue bg-opacity-40 animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <p className="text-center">"{wish}"</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleAddWish}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                >
                  Add a Birthday Wish 🎁
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <footer className="text-center py-6 text-sm text-gray-500">
        <p className="animate-sway inline-block font-birthday text-base">
          Made with ❤️ for Isha's 22nd Birthday
        </p>
      </footer>
    </div>
  );
};

export default Index;
