import { useState } from 'react';
import { toast } from 'sonner';
import FortuneWheel from '@/components/FortuneWheel';
import ProfileHeader from '@/components/ProfileHeader';
import Navigation from '@/components/Navigation';
import StatsView from '@/components/StatsView';
import InventoryView from '@/components/InventoryView';
import ShopView from '@/components/ShopView';
import UserProfile from '@/components/UserProfile';

interface SpinRecord {
  id: number;
  timestamp: Date;
  prize: number;
  isWin: boolean;
}

interface Player {
  id: number;
  username: string;
  photoUrl?: string;
  totalWinnings: number;
  spinsCount: number;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<'wheel' | 'stats' | 'inventory' | 'shop' | 'profile'>('wheel');
  const [balance, setBalance] = useState(5.0);
  const [history, setHistory] = useState<SpinRecord[]>([]);

  const currentUser = {
    id: 1,
    username: '@krovolok',
    photoUrl: undefined,
    balance: balance,
    rank: 1,
    totalSpins: history.length,
    totalWinnings: history.reduce((sum, r) => sum + (r.isWin ? r.prize : 0), 0),
    joinDate: new Date(2025, 0, 1),
  };

  const leaderboardPlayers: Player[] = [
    {
      id: 1,
      username: '@krovolok',
      photoUrl: undefined,
      totalWinnings: currentUser.totalWinnings,
      spinsCount: history.length,
    },
    {
      id: 2,
      username: 'WheelMaster',
      photoUrl: undefined,
      totalWinnings: 45.8,
      spinsCount: 132,
    },
    {
      id: 3,
      username: 'LuckyOne',
      photoUrl: undefined,
      totalWinnings: 38.2,
      spinsCount: 98,
    },
    {
      id: 4,
      username: 'SpinKing',
      photoUrl: undefined,
      totalWinnings: 32.5,
      spinsCount: 87,
    },
    {
      id: 5,
      username: 'FortuneHunter',
      photoUrl: undefined,
      totalWinnings: 28.9,
      spinsCount: 76,
    },
  ].sort((a, b) => b.totalWinnings - a.totalWinnings);

  const handleSpin = (prize: number) => {
    const spinCost = 0.1;
    const newBalance = balance - spinCost + prize;
    setBalance(newBalance);

    const newRecord: SpinRecord = {
      id: Date.now(),
      timestamp: new Date(),
      prize: prize,
      isWin: prize > spinCost,
    };

    setHistory([newRecord, ...history]);

    if (prize > spinCost) {
      toast.success(`🎉 Поздравляем! Вы выиграли ${prize.toFixed(2)} TON!`, {
        duration: 4000,
      });
    } else {
      toast.info(`Выпало ${prize.toFixed(2)} TON. Попробуйте еще раз!`, {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,123,200,0.1),transparent_50%)]" />
      
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <ProfileHeader
          username={currentUser.username}
          photoUrl={currentUser.photoUrl}
          balance={balance}
          rank={currentUser.rank}
        />

        <div className="mt-4">
          {activeTab === 'wheel' && (
            <FortuneWheel onSpin={handleSpin} balance={balance} />
          )}

          {activeTab === 'stats' && (
            <StatsView
              totalSpins={currentUser.totalSpins}
              totalWinnings={currentUser.totalWinnings}
              winRate={currentUser.totalSpins > 0 ? parseFloat(((currentUser.totalWinnings / (currentUser.totalSpins * 0.1)) * 100).toFixed(1)) : 0}
              balance={balance}
            />
          )}

          {activeTab === 'inventory' && <InventoryView />}

          {activeTab === 'shop' && <ShopView />}

          {activeTab === 'profile' && (
            <UserProfile
              username={currentUser.username}
              photoUrl={currentUser.photoUrl}
              balance={balance}
              totalSpins={currentUser.totalSpins}
              totalWinnings={currentUser.totalWinnings}
              rank={currentUser.rank}
              joinDate={currentUser.joinDate}
            />
          )}
        </div>
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}