import { useEffect, useRef } from 'react';
import { useSportsStore } from '../store/sportsStore';
import { fetchWithTimeout } from '../services/apiClient';

// Algorithm 15: 15-Second Background Scorecard Poller
export function useLiveScorecard(matchId?: string) {
  const { updateEventScorecard, selectedMatch } = useSportsStore();
  const pollRef = useRef<any>(null);

  const targetId = matchId || selectedMatch?.id;

  const fetchScorecard = async () => {
    if (!targetId) return;

    try {
      const data = await fetchWithTimeout<any>(`/api/sports/scorecard?id=${encodeURIComponent(targetId)}`, { timeoutMs: 5000 });
      if (data && (data.cricket || data.football || data.score)) {
        updateEventScorecard(targetId, {
          cricket: data.cricket || (data.sport === 'cricket' ? data : undefined),
          football: data.football || (data.sport === 'football' ? data : undefined),
          raw: data,
        });
      }
    } catch (e) {
      // Scorecard endpoints can be quiet when no match is live
    }
  };

  useEffect(() => {
    if (!targetId) return;

    fetchScorecard();
    pollRef.current = setInterval(fetchScorecard, 15000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [targetId]);

  return { refresh: fetchScorecard };
}
