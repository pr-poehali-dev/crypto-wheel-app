import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StatsViewProps {
  totalSpins: number;
  totalWinnings: number;
  winRate: number;
  balance: number;
}

export default function StatsView({ totalSpins, totalWinnings, winRate, balance }: StatsViewProps) {
  return (
    <div className="space-y-6 pb-24 pt-8">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 backdrop-blur-sm p-6 text-center">
          <Icon name="Wallet" size={40} className="mx-auto mb-3 text-purple-400" />
          <div className="text-4xl font-bold text-white mb-2">{balance.toFixed(2)}</div>
          <div className="text-sm text-white/60 uppercase tracking-wide">Balance TON</div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm p-6 text-center">
          <Icon name="RotateCw" size={40} className="mx-auto mb-3 text-blue-400" />
          <div className="text-4xl font-bold text-white mb-2">{totalSpins}</div>
          <div className="text-sm text-white/60 uppercase tracking-wide">Total Spins</div>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30 backdrop-blur-sm p-6 text-center">
          <Icon name="TrendingUp" size={40} className="mx-auto mb-3 text-green-400" />
          <div className="text-4xl font-bold text-white mb-2">{totalWinnings.toFixed(2)}</div>
          <div className="text-sm text-white/60 uppercase tracking-wide">Total Won</div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-500/30 backdrop-blur-sm p-6 text-center">
          <Icon name="Percent" size={40} className="mx-auto mb-3 text-yellow-400" />
          <div className="text-4xl font-bold text-white mb-2">{winRate}%</div>
          <div className="text-sm text-white/60 uppercase tracking-wide">Win Rate</div>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-card/40 to-card/20 border-primary/20 backdrop-blur-sm p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="Award" size={24} className="text-yellow-400" />
          Achievements
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">First Spin</div>
              <div className="text-sm text-white/60">Complete your first spin</div>
            </div>
            <Icon name="CheckCircle" size={24} className="text-green-400" />
          </div>

          {totalSpins >= 10 && (
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">Spin Master</div>
                <div className="text-sm text-white/60">Complete 10 spins</div>
              </div>
              <Icon name="CheckCircle" size={24} className="text-green-400" />
            </div>
          )}

          {totalWinnings >= 5 && (
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Icon name="Trophy" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">Big Winner</div>
                <div className="text-sm text-white/60">Win 5+ TON total</div>
              </div>
              <Icon name="CheckCircle" size={24} className="text-green-400" />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
