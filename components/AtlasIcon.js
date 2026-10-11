import {
  Landmark,
  UtensilsCrossed,
  Sparkles,
  Compass,
  Bus,
  MapPin,
  ShoppingBag,
  BookOpen,
} from 'lucide-react';

const ICON_MAP = {
  Landmark,
  UtensilsCrossed,
  Sparkles,
  Compass,
  Bus,
  MapPin,
  ShoppingBag,
  BookOpen,
};

export default function AtlasIcon({ name, className = 'w-6 h-6' }) {
  const IconComponent = ICON_MAP[name] || BookOpen;
  return <IconComponent className={className} />;
}
