// Character definitions for Subway Surfers: Mumbai Edition
export interface CharacterDef {
  id: string;
  name: string;
  title: string;
  avatar: string;
  perk: string;
  desc: string;
  shirtColor: number;
  pantsColor: number;
  shoesColor: number;
  hatColor?: number;
  accentColor: number;
}

export const CHARACTERS: CharacterDef[] = [
  {
    id: 'jake',
    name: 'Jake',
    title: 'Original Subway Surfer',
    avatar: '🧢',
    perk: 'Balanced Agility',
    desc: 'The legendary graffiti runner with classic street style.',
    shirtColor: 0x1d4ed8,   // Denim Blue
    pantsColor: 0x334155,   // Dark Denim
    shoesColor: 0xf8fafc,   // White Sneakers
    hatColor: 0xf8fafc,     // White Cap
    accentColor: 0xf59e0b,  // Gold Trim
  },
  {
    id: 'aarav',
    name: 'Aarav',
    title: 'Mumbai Sprint King',
    avatar: '🏃‍♂️',
    perk: '+15% Star Multiplier',
    desc: 'Marine Drive parkour athlete in vibrant saffron sports jersey.',
    shirtColor: 0xea580c,   // Saffron Orange
    pantsColor: 0x0f172a,   // Obsidian Track Pants
    shoesColor: 0xfacc15,   // Gold Trainers
    hatColor: 0xea580c,     // Saffron Headband
    accentColor: 0xf97316,
  },
  {
    id: 'priya',
    name: 'Priya',
    title: 'Desi Parkour Queen',
    avatar: '🏃‍♀️',
    perk: '+20% Coin Magnet',
    desc: 'Agile rooftop gymnast with stylish fusion jacket and neon kicks.',
    shirtColor: 0xdb2777,   // Magenta Fusion Jacket
    pantsColor: 0x1e1b4b,   // Deep Indigo Joggers
    shoesColor: 0x06b6d4,   // Cyan Kicks
    hatColor: 0xec4899,
    accentColor: 0x06b6d4,
  },
  {
    id: 'kabir',
    name: 'Kabir',
    title: 'Cyberpunk Neon Racer',
    avatar: '⚡',
    perk: '+25% Jetpack Duration',
    desc: 'Bandra techie with glowing cyberpunk neon hoodie and magnetic boots.',
    shirtColor: 0x09090b,   // Cyberpunk Black
    pantsColor: 0x18181b,   // Techwear Cargo
    shoesColor: 0x10b981,   // Emerald Glow Boots
    hatColor: 0x10b981,     // Neon Visor
    accentColor: 0x10b981,
  },
];

export function getCharacter(id?: string): CharacterDef {
  const char = CHARACTERS.find((c) => c.id === id);
  return char || CHARACTERS[0];
}

export function getSelectedCharacter(): CharacterDef {
  try {
    const saved = localStorage.getItem('subway_char_id');
    return getCharacter(saved || 'jake');
  } catch {
    return CHARACTERS[0];
  }
}

export function setSelectedCharacter(id: string) {
  try {
    localStorage.setItem('subway_char_id', id);
  } catch {}
}
