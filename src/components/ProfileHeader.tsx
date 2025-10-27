import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ProfileHeaderProps {
  username: string;
  photoUrl?: string;
  balance: number;
  rank: number;
  lastGame?: { user: string; amount: string; chance: string };
  topGame?: { user: string; amount: string; chance: string };
}

export default function ProfileHeader({ username, photoUrl, balance, rank, lastGame, topGame }: ProfileHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="History" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Last Game</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Avatar className="h-6 w-6 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-xs">T</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{lastGame?.user || '@Timers'}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-green-400">+231 TON</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">CHANCE {lastGame?.chance || '93%'}</div>
        </div>

        <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Trophy" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Top Game</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Avatar className="h-6 w-6 border border-primary/30">
              <AvatarFallback className="bg-primary/20 text-xs">G</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{topGame?.user || '@giftgambler_a...'}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-yellow-400">+48603 TON</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">CHANCE {topGame?.chance || '82%'}</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">3 GIFTS</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">8.34</span>
            <span className="text-sm font-semibold text-muted-foreground">TON</span>
          </div>
        </div>
      </div>
    </div>
  );
}
