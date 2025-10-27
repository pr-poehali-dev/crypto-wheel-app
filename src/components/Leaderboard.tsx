import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Player {
  id: number;
  username: string;
  photoUrl?: string;
  totalWinnings: number;
  spinsCount: number;
}

interface LeaderboardProps {
  players: Player[];
  currentUserId: number;
}

export default function Leaderboard({ players, currentUserId }: LeaderboardProps) {
  const topThreeColors = ['#FEC6A1', '#C0C0C0', '#CD7F32'];

  return (
    <div className="space-y-4 pb-24">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Icon name="Trophy" className="text-gold" size={28} />
        Таблица лидеров
      </h2>

      {players.map((player, index) => {
        const isCurrentUser = player.id === currentUserId;
        const isTopThree = index < 3;

        return (
          <Card
            key={player.id}
            className={`p-4 transition-all hover:scale-[1.02] ${
              isCurrentUser
                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary shadow-lg'
                : 'bg-card/50 backdrop-blur-sm border-primary/10'
            } ${isTopThree ? 'animate-float' : ''}`}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{
                    background: isTopThree
                      ? `linear-gradient(135deg, ${topThreeColors[index]}, ${topThreeColors[index]}AA)`
                      : 'hsl(var(--muted))',
                  }}
                >
                  {index + 1}
                </div>
                {isTopThree && (
                  <div className="absolute -top-1 -right-1">
                    <Icon name="Crown" size={20} className="text-gold drop-shadow-lg" />
                  </div>
                )}
              </div>

              <Avatar className="h-12 w-12 border-2 border-primary/30">
                <AvatarImage src={player.photoUrl} alt={player.username} />
                <AvatarFallback className="bg-gradient-to-br from-primary/50 to-secondary/50">
                  {player.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  {player.username}
                  {isCurrentUser && (
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Вы</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {player.spinsCount} вращений
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-secondary">
                  {player.totalWinnings.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">TON</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
