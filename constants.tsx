
import { Mood } from './types';

export const MOODS: Mood[] = [
  {
    id: 'work',
    label: 'Deep Work',
    icon: '☕️',
    description: 'Quiet spots with great Wi-Fi and caffeine.',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'date',
    label: 'Date Night',
    icon: '✨',
    description: 'Romantic ambiance and memorable dining.',
    color: 'bg-rose-100 text-rose-700 border-rose-200'
  },
  {
    id: 'quick_bite',
    label: 'Quick Bite',
    icon: '🍕',
    description: 'Fast, reliable, and delicious local food.',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'budget',
    label: 'On a Budget',
    icon: '💸',
    description: 'Best value-for-money gems in your area.',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  {
    id: 'hidden_gem',
    label: 'Hidden Gem',
    icon: '💎',
    description: 'Off the beaten path, highly rated secrets.',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'outdoor',
    label: 'Fresh Air',
    icon: '🌿',
    description: 'Parks, rooftops, and outdoor seating.',
    color: 'bg-sky-100 text-sky-700 border-sky-200'
  }
];
