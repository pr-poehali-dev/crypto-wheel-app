import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface InventoryItem {
  id: number;
  name: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  imageUrl?: string;
}

export default function InventoryView() {
  const items: InventoryItem[] = [
    { id: 1, name: 'Lucky Coin', type: 'Booster', rarity: 'common', value: 0.5 },
    { id: 2, name: 'Golden Ticket', type: 'Booster', rarity: 'rare', value: 1.0 },
    { id: 3, name: 'Diamond Spin', type: 'Premium', rarity: 'epic', value: 2.5 },
  ];

  const rarityColors = {
    common: 'from-gray-500 to-gray-700 border-gray-400',
    rare: 'from-blue-500 to-blue-700 border-blue-400',
    epic: 'from-purple-500 to-purple-700 border-purple-400',
    legendary: 'from-yellow-500 to-yellow-700 border-yellow-400',
  };

  const rarityIcons = {
    common: 'Circle',
    rare: 'Hexagon',
    epic: 'Star',
    legendary: 'Crown',
  };

  return (
    <div className="space-y-6 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Inventory</h2>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
          <Icon name="Package" size={20} className="text-white/60" />
          <span className="text-white font-semibold">{items.length}/50</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`bg-gradient-to-br ${rarityColors[item.rarity]} backdrop-blur-sm p-4 cursor-pointer hover:scale-105 transition-all relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            
            <div className="relative z-10">
              <div className="absolute top-2 right-2">
                <Icon name={rarityIcons[item.rarity]} size={16} className="text-white/80" />
              </div>

              <div className="h-32 flex items-center justify-center mb-3">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon name="Gift" size={40} className="text-white" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-white/60 uppercase mb-2">{item.type}</p>
                <div className="flex items-center justify-center gap-1">
                  <Icon name="Coins" size={14} className="text-yellow-400" />
                  <span className="text-sm font-semibold text-white">{item.value} TON</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Card className="bg-white/5 backdrop-blur-sm p-4 border border-dashed border-white/20 flex flex-col items-center justify-center gap-3 min-h-[240px]">
          <Icon name="Plus" size={48} className="text-white/40" />
          <p className="text-sm text-white/60 text-center">Empty Slot</p>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-card/40 to-card/20 border-primary/20 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Total Inventory Value</h3>
            <p className="text-sm text-white/60">Combined worth of all items</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-400">
              {items.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
            </div>
            <div className="text-sm text-white/60">TON</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
