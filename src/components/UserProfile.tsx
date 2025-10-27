import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  username: string;
  photoUrl?: string;
  balance: number;
  totalSpins: number;
  totalWinnings: number;
  rank: number;
  joinDate: Date;
}

export default function UserProfile({
  username,
  photoUrl,
  balance,
  totalSpins,
  totalWinnings,
  rank,
  joinDate,
}: UserProfileProps) {
  const winRate = totalSpins > 0 ? ((totalWinnings / (totalSpins * 0.1)) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6 pb-24">
      <Card className="bg-gradient-to-br from-card via-card to-primary/10 border-primary/30 backdrop-blur-sm p-8">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-32 w-32 border-4 border-primary shadow-2xl mb-4">
            <AvatarImage src={photoUrl} alt={username} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-5xl font-bold">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-3xl font-bold text-foreground mb-2">{username}</h2>

          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Icon name="Calendar" size={16} />
            <span className="text-sm">
              Играет с{' '}
              {new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(
                joinDate
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full">
            <Icon name="Crown" size={20} />
            <span className="font-bold">Рейтинг #{rank}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-center">
          <Icon name="Wallet" size={32} className="mx-auto mb-2 text-primary" />
          <div className="text-3xl font-bold text-foreground mb-1">{balance.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Баланс TON</div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-center">
          <Icon name="RotateCw" size={32} className="mx-auto mb-2 text-secondary" />
          <div className="text-3xl font-bold text-foreground mb-1">{totalSpins}</div>
          <div className="text-sm text-muted-foreground">Всего вращений</div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-center">
          <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-accent" />
          <div className="text-3xl font-bold text-foreground mb-1">{totalWinnings.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">Всего выиграно</div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-center">
          <Icon name="Percent" size={32} className="mx-auto mb-2 text-gold" />
          <div className="text-3xl font-bold text-foreground mb-1">{winRate}%</div>
          <div className="text-sm text-muted-foreground">Процент выигрыша</div>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Gift" size={24} className="text-primary" />
          Достижения
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-card/50 rounded-lg p-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">Новичок</div>
              <div className="text-sm text-muted-foreground">Сделал первое вращение</div>
            </div>
            <Icon name="CheckCircle" size={24} className="text-secondary" />
          </div>

          {totalSpins >= 10 && (
            <div className="flex items-center gap-3 bg-card/50 rounded-lg p-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">Энтузиаст</div>
                <div className="text-sm text-muted-foreground">10+ вращений</div>
              </div>
              <Icon name="CheckCircle" size={24} className="text-secondary" />
            </div>
          )}

          {totalWinnings >= 5 && (
            <div className="flex items-center gap-3 bg-card/50 rounded-lg p-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Trophy" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">Победитель</div>
                <div className="text-sm text-muted-foreground">Выиграл 5+ TON</div>
              </div>
              <Icon name="CheckCircle" size={24} className="text-secondary" />
            </div>
          )}
        </div>
      </Card>

      <Button className="w-full bg-gradient-to-r from-destructive/80 to-destructive hover:opacity-90 text-white font-bold py-6 rounded-xl">
        <Icon name="LogOut" size={20} className="mr-2" />
        Выйти из аккаунта
      </Button>
    </div>
  );
}
