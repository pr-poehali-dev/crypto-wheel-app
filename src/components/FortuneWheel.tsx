import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const prizes = [
  { id: 1, value: 0.5, color: '#9b87f5', label: '0.5 TON' },
  { id: 2, value: 0.1, color: '#0EA5E9', label: '0.1 TON' },
  { id: 3, value: 1.0, color: '#FEC6A1', label: '1.0 TON' },
  { id: 4, value: 0.2, color: '#9b87f5', label: '0.2 TON' },
  { id: 5, value: 0.05, color: '#0EA5E9', label: '0.05 TON' },
  { id: 6, value: 2.0, color: '#FEC6A1', label: '2.0 TON' },
  { id: 7, value: 0.3, color: '#9b87f5', label: '0.3 TON' },
  { id: 8, value: 0.1, color: '#0EA5E9', label: '0.1 TON' },
];

interface FortuneWheelProps {
  onSpin: (prize: number) => void;
  balance: number;
}

export default function FortuneWheel({ onSpin, balance }: FortuneWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

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

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-gold drop-shadow-lg" />
        </div>

        <div className="relative w-80 h-80">
          <div
            className="w-full h-full rounded-full border-8 border-gold shadow-2xl transition-transform duration-[4000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${prizes.map((prize, i) => {
                const start = (i / prizes.length) * 360;
                const end = ((i + 1) / prizes.length) * 360;
                return `${prize.color} ${start}deg ${end}deg`;
              }).join(', ')})`,
            }}
          >
            {prizes.map((prize, index) => {
              const angle = (360 / prizes.length) * index + (360 / prizes.length / 2);
              return (
                <div
                  key={prize.id}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `rotate(${angle}deg) translateX(90px)`,
                  }}
                >
                  <span className="text-white font-bold text-sm drop-shadow-lg block -rotate-90 whitespace-nowrap">
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-600 border-4 border-white shadow-xl flex items-center justify-center">
            <Icon name="Sparkles" size={28} className="text-white" />
          </div>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 w-80">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Стоимость вращения:</span>
            <span className="text-lg font-bold text-secondary">0.1 TON</span>
          </div>
          <Button 
            onClick={spinWheel}
            disabled={isSpinning || balance < 0.1}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold text-lg py-6 rounded-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
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
                <Icon name="Zap" className="mr-2" size={20} />
                Крутить колесо
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
