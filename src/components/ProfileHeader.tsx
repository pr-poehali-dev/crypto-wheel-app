import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ProfileHeaderProps {
  username: string;
  photoUrl?: string;
  balance: number;
  rank: number;
}

export default function ProfileHeader({ username, photoUrl, balance, rank }: ProfileHeaderProps) {
  return (
    <Card className="bg-gradient-to-br from-card via-card to-primary/10 border-primary/30 backdrop-blur-sm">
      <div className="p-6 flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-primary shadow-xl">
            <AvatarImage src={photoUrl} alt={username} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-gold text-background rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow-lg">
            #{rank}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            {username}
            <Icon name="CheckCircle" size={20} className="text-primary" />
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Coins" size={16} />
            <span className="text-sm">Telegram Player</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Баланс</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {balance.toFixed(2)}
          </div>
          <div className="text-sm font-semibold text-secondary">TON</div>
        </div>
      </div>
    </Card>
  );
}
