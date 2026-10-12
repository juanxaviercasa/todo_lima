import {
  UtensilsCrossed,
  Wrench,
  HardHat,
  HeartPulse,
  Sparkles,
  PawPrint,
  Car,
  ShoppingBag,
  Compass,
  GraduationCap,
  Trophy,
  PartyPopper,
  Briefcase,
  Building2,
  Folder
} from 'lucide-react';

const ICON_MAP = {
  UtensilsCrossed,
  Wrench,
  HardHat,
  HeartPulse,
  Sparkles,
  PawPrint,
  Car,
  ShoppingBag,
  Compass,
  GraduationCap,
  Trophy,
  PartyPopper,
  Briefcase,
  Building2
};

export default function AreaIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = ICON_MAP[name] || Folder;
  return <IconComponent className={className} aria-hidden="true" />;
}
