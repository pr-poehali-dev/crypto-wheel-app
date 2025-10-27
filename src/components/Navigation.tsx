import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: 'wheel' | 'rating' | 'history' | 'profile';
  onTabChange: (tab: 'wheel' | 'rating' | 'history' | 'profile') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'wheel' as const, icon: 'CircleDot', label: 'Колесо' },
    { id: 'rating' as const, icon: 'Trophy', label: 'Рейтинг' },
    { id: 'history' as const, icon: 'History', label: 'История' },
    { id: 'profile' as const, icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-primary/20 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={24} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
