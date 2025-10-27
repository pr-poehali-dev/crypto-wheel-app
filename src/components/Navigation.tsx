import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: 'wheel' | 'stats' | 'inventory' | 'shop' | 'profile';
  onTabChange: (tab: 'wheel' | 'stats' | 'inventory' | 'shop' | 'profile') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'wheel' as const, icon: 'Swords', label: 'PvP' },
    { id: 'stats' as const, icon: 'Target', label: 'Solo' },
    { id: 'inventory' as const, icon: 'Package', label: 'Inventory' },
    { id: 'shop' as const, icon: 'Store', label: 'Shop' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1.5 h-auto py-2 px-6 transition-all rounded-xl ${
                activeTab === tab.id
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name={tab.icon} size={22} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -top-4">
        <Button
          onClick={() => onTabChange('profile')}
          className="rounded-full w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 shadow-lg shadow-purple-500/50 border-4 border-black"
        >
          <Icon name="User" size={24} />
        </Button>
      </div>
    </div>
  );
}
