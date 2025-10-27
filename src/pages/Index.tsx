import { useState } from 'react';
import { toast } from 'sonner';
import FortuneWheel from '@/components/FortuneWheel';
import ProfileHeader from '@/components/ProfileHeader';
import Navigation from '@/components/Navigation';
import Leaderboard from '@/components/Leaderboard';
import SpinHistory from '@/components/SpinHistory';
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
  const [activeTab, setActiveTab] = useState<'wheel' | 'rating' | 'history' | 'profile'>('wheel');
  const [balance, setBalance] = useState(5.0);
  const [history, setHistory] = useState<SpinRecord[]>([]);

  const currentUser = {
    id: 1,
    username: 'CryptoPlayer',
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
      username: 'CryptoPlayer',
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
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <ProfileHeader
          username={currentUser.username}
          photoUrl={currentUser.photoUrl}
          balance={balance}
          rank={currentUser.rank}
        />

        <div className="mt-6">
          {activeTab === 'wheel' && (
            <FortuneWheel onSpin={handleSpin} balance={balance} />
          )}

          {activeTab === 'rating' && (
            <Leaderboard players={leaderboardPlayers} currentUserId={currentUser.id} />
          )}

          {activeTab === 'history' && <SpinHistory history={history} />}

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
