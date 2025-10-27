import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GiftItem {
  id: number;
  name: string;
  itemId: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
  emoji: string;
}

export default function ShopView() {
  const [filter, setFilter] = useState('all');

  const gifts: GiftItem[] = [
    { id: 1, name: 'Desk Calendar', itemId: '#187669', price: 2, rarity: 'common', color: 'from-cyan-400 to-cyan-600', emoji: '📅' },
    { id: 2, name: 'Desk Calendar', itemId: '#175725', price: 2, rarity: 'rare', color: 'from-blue-500 to-blue-700', emoji: '📆' },
    { id: 3, name: 'Desk Calendar', itemId: '#323350', price: 2, rarity: 'epic', color: 'from-purple-500 to-purple-700', emoji: '🗓️' },
    { id: 4, name: 'Desk Calendar', itemId: '#298445', price: 2, rarity: 'common', color: 'from-gray-400 to-gray-600', emoji: '📋' },
    { id: 5, name: 'Desk Calendar', itemId: '#445566', price: 2, rarity: 'rare', color: 'from-sky-400 to-sky-600', emoji: '📓' },
    { id: 6, name: 'Desk Calendar', itemId: '#778899', price: 2, rarity: 'legendary', color: 'from-pink-400 to-pink-600', emoji: '📒' },
  ];

  return (
    <div className="space-y-6 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Gift Shop</h2>
        <div className="flex items-center gap-2 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
          <Icon name="Diamond" size={20} className="text-purple-400" />
          <span className="text-white font-semibold">0</span>
          <Icon name="Gift" size={20} className="text-white/60" />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <Icon name="ArrowUpDown" size={16} className="mr-2" />
          Sort
        </Button>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
            <SelectItem value="epic">Epic</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Skin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skins</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="BG" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All BG</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {gifts.map((gift) => (
          <Card
            key={gift.id}
            className={`bg-gradient-to-br ${gift.color} backdrop-blur-sm p-4 cursor-pointer hover:scale-105 transition-all relative overflow-hidden group border-2 border-white/20`}
          >
            <div className="absolute top-2 right-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-white/20 hover:bg-white/30 rounded-full"
              >
                <Icon name="Plus" size={16} className="text-white" />
              </Button>
            </div>

            <div className="h-28 flex items-center justify-center mb-3">
              <div className="text-6xl">{gift.emoji}</div>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-white text-sm mb-1">{gift.name}</h3>
              <p className="text-xs text-white/70 mb-3">{gift.itemId}</p>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2">
                <Icon name="Diamond" size={14} className="mr-1" />
                {gift.price} TON
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg">
        <Icon name="Diamond" size={20} className="mr-2" />
        Connect Wallet
      </Button>
    </div>
  );
}
