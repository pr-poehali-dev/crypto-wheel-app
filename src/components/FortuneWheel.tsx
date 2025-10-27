import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const prizes = [
  { id: 1, value: 0.5, color: '#8B7BC8', label: '0.5' },
  { id: 2, value: 0.1, color: '#A89DD9', label: '0.1' },
  { id: 3, value: 1.0, color: '#8B7BC8', label: '1.0' },
  { id: 4, value: 0.2, color: '#A89DD9', label: '0.2' },
  { id: 5, value: 0.05, color: '#7B5FB0', label: '0.05' },
  { id: 6, value: 2.0, color: '#A89DD9', label: '2.0' },
  { id: 7, value: 0.3, color: '#8B7BC8', label: '0.3' },
  { id: 8, value: 0.1, color: '#7B5FB0', label: '0.1' },
];

interface FortuneWheelProps {
  onSpin: (prize: number) => void;
  balance: number;
}

export default function FortuneWheel({ onSpin, balance }: FortuneWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [countdown, setCountdown] = useState(27);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const spinWheel = () => {
    if (isSpinning || balance < 0.1) return;

    setIsSpinning(true);
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    const prizeIndex = prizes.findIndex(p => p.id === randomPrize.id);
    const degreesPerSegment = 360 / prizes.length;
    const targetRotation = 360 * 5 + (prizeIndex * degreesPerSegment) + (degreesPerSegment / 2);
    
    setRotation(rotation + targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpin(randomPrize.value);
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 5}px`,
            }}
          >
            ★
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-white drop-shadow-lg" />
        </div>

        <div className="relative w-[400px] h-[400px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%)',
              transform: 'scale(1.2)',
            }}
          />

          <div className="absolute -inset-4">
            <svg width="100%" height="100%" viewBox="0 0 500 500" className="animate-[spin_20s_linear_infinite]">
              <path d="M 250,10 Q 260,15 265,25 L 285,75 Q 280,85 270,88 L 250,92 Q 240,88 235,75 L 215,25 Q 220,15 230,10 Z" fill="rgba(255,255,255,0.1)" />
              <circle cx="60" cy="100" r="15" fill="rgba(255,100,0,0.3)" />
              <circle cx="440" cy="140" r="12" fill="rgba(100,255,0,0.3)" />
              <path d="M 420,380 L 440,360 L 450,385 Z" fill="rgba(255,255,255,0.15)" />
              <circle cx="80" cy="420" r="10" fill="rgba(200,100,255,0.3)" />
            </svg>
          </div>

          <div
            className="w-full h-full rounded-full border-[12px] shadow-2xl transition-transform duration-[4000ms] ease-out relative overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${prizes.map((prize, i) => {
                const start = (i / prizes.length) * 360;
                const end = ((i + 1) / prizes.length) * 360;
                return `${prize.color} ${start}deg ${end}deg`;
              }).join(', ')})`,
              borderColor: '#000',
            }}
          >
            <div className="absolute inset-0 rounded-full" style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }} />

            {prizes.map((prize, index) => {
              const angle = (360 / prizes.length) * index + (360 / prizes.length / 2);
              return (
                <div
                  key={prize.id}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `rotate(${angle}deg) translateX(120px)`,
                  }}
                >
                  <div className="flex flex-col items-center -rotate-90">
                    <Icon name="Coins" size={20} className="text-yellow-400 mb-1" />
                    <span className="text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {prize.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-black border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="text-xs text-white/60 mb-1">Starts in</div>
            <div className="text-4xl font-bold text-white">{formatTime(countdown)}</div>
          </div>
        </div>
      </div>

      <Button 
        onClick={spinWheel}
        disabled={isSpinning || balance < 0.1}
        className="w-80 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white font-bold text-lg py-6 rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/50 z-10"
      >
        {isSpinning ? (
          <>
            <Icon name="Loader2" className="animate-spin mr-2" size={20} />
            Вращение...
          </>
        ) : balance < 0.1 ? (
          'Недостаточно средств'
        ) : (
          <>
            <Icon name="Play" className="mr-2" size={20} />
            Крутить колесо
          </>
        )}
      </Button>
    </div>
  );
}
