// Subway Surfers: Top Run Leaderboard & High Scorer System
import { load, save } from './storage';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  stars: number;
  avatar: string;
  date: string;
  badge: 'diamond' | 'gold' | 'silver' | 'bronze';
  isPlayer?: boolean;
}

const DEFAULT_SCORES: LeaderboardEntry[] = [
  { id: '1', name: 'Aarav Sharma (Mumbai)', score: 148500, stars: 18, avatar: '👑', date: 'Today', badge: 'diamond' },
  { id: '2', name: 'Priya Patel (Surat)', score: 96200, stars: 12, avatar: '⚡', date: 'Yesterday', badge: 'diamond' },
  { id: '3', name: 'Jake (Surfer Pro)', score: 68400, stars: 8, avatar: '🛹', date: '3d ago', badge: 'gold' },
  { id: '4', name: 'Rohan Verma (Delhi)', score: 45100, stars: 5, avatar: '🚀', date: '5d ago', badge: 'silver' },
  { id: '5', name: 'Ananya Roy (Kolkata)', score: 28900, stars: 3, avatar: '🌟', date: '1w ago', badge: 'bronze' },
];

export function getLeaderboard(): LeaderboardEntry[] {
  const custom = load<LeaderboardEntry[]>('top_scorers', []);
  if (!custom || custom.length === 0) {
    save('top_scorers', DEFAULT_SCORES);
    return DEFAULT_SCORES;
  }
  return custom.sort((a, b) => b.score - a.score);
}

export function recordScore(score: number, stars: number): { rank: number; entries: LeaderboardEntry[]; isNewTop: boolean } {
  if (score <= 0) {
    const current = getLeaderboard();
    return { rank: -1, entries: current, isNewTop: false };
  }

  const entries: LeaderboardEntry[] = getLeaderboard().map((e) => ({ ...e, isPlayer: !!e.isPlayer }));
  const existingPlayerIdx = entries.findIndex((e) => e.isPlayer);

  const playerEntry: LeaderboardEntry = {
    id: 'player_me',
    name: 'You (Jake)',
    score: Math.max(score, existingPlayerIdx >= 0 ? (entries[existingPlayerIdx].score || 0) : score),
    stars: Math.max(stars, existingPlayerIdx >= 0 ? (entries[existingPlayerIdx].stars || 0) : stars),
    avatar: '🛹',
    date: 'Just now',
    badge: score >= 90000 ? 'diamond' : score >= 60000 ? 'gold' : score >= 35000 ? 'silver' : 'bronze',
    isPlayer: true,
  };

  if (existingPlayerIdx >= 0) {
    entries[existingPlayerIdx] = playerEntry;
  } else {
    entries.push(playerEntry);
  }

  entries.sort((a, b) => b.score - a.score);
  const trimmed = entries.slice(0, 10);
  save('top_scorers', trimmed);

  const rank = trimmed.findIndex((e) => e.isPlayer) + 1;
  const isNewTop = rank === 1;

  return { rank, entries: trimmed, isNewTop };
}

export function formatScore(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
