import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SpinRecord {
  id: number;
  timestamp: Date;
  prize: number;
  isWin: boolean;
}

interface SpinHistoryProps {
  history: SpinRecord[];
}

export default function SpinHistory({ history }: SpinHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const totalWon = history.reduce((sum, record) => sum + (record.isWin ? record.prize : 0), 0);
  const totalSpent = history.length * 0.1;
  const netProfit = totalWon - totalSpent;

  return (
    <div className="space-y-4 pb-24">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Icon name="History" className="text-primary" size={28} />
        История вращений
      </h2>

      <Card className="bg-gradient-to-br from-card/80 to-primary/10 backdrop-blur-sm border-primary/20 p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Вращений</div>
            <div className="text-2xl font-bold text-foreground">{history.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Выиграно</div>
            <div className="text-2xl font-bold text-secondary">{totalWon.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Прибыль</div>
            <div
              className={`text-2xl font-bold ${
                netProfit >= 0 ? 'text-secondary' : 'text-destructive'
              }`}
            >
              {netProfit >= 0 ? '+' : ''}{netProfit.toFixed(2)}
            </div>
          </div>
        </div>
      </Card>

      {history.length === 0 ? (
        <Card className="bg-card/30 backdrop-blur-sm p-12 text-center">
          <Icon name="CircleDashed" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">Пока нет истории вращений</p>
          <p className="text-sm text-muted-foreground mt-2">
            Крутите колесо, чтобы начать играть!
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((record) => (
            <Card
              key={record.id}
              className="bg-card/50 backdrop-blur-sm border-primary/10 p-4 transition-all hover:scale-[1.02] hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      record.isWin
                        ? 'bg-gradient-to-br from-secondary/30 to-secondary/10'
                        : 'bg-gradient-to-br from-muted/30 to-muted/10'
                    }`}
                  >
                    <Icon
                      name={record.isWin ? 'TrendingUp' : 'Minus'}
                      size={24}
                      className={record.isWin ? 'text-secondary' : 'text-muted-foreground'}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {record.isWin ? 'Выигрыш' : 'Попытка'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(record.timestamp)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${
                      record.isWin ? 'text-secondary' : 'text-muted-foreground'
                    }`}
                  >
                    {record.isWin ? '+' : ''}{record.prize.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">TON</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
