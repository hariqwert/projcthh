import { useEffect, useRef } from 'react';
import { useSportsStore } from '../store/sportsStore';
import { sportsClient } from '../services/sportsClient';

// Algorithm 12 & 14: Real-time Event Expiry Pruner (30s) + Speculative Pre-Warming
export function useSportsSchedule() {
  const { setEvents, setProbeLatency, setIsLoading } = useSportsStore();
  const pollRef = useRef<any>(null);

  const loadSchedule = async () => {
    setIsLoading(true);
    try {
      const data = await sportsClient.fetchLiveEvents();
      setEvents(data);

      // Algorithm 14: Speculative Feed Pre-Warming
      // Probe reachability of the top 3 live events asynchronously
      const topFeeds = data.live.slice(0, 3);
      for (const event of topFeeds) {
        if (event.sources && event.sources.length > 0) {
          const primarySource = event.sources[0];
          sportsClient.probeSourceReachability(primarySource).then(({ isOnline, latencyMs }) => {
            setProbeLatency(primarySource.id, latencyMs);
          });
        }
      }
    } catch (e) {
      console.warn('Error fetching live sports', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule();

    // 30-second background polling
    pollRef.current = setInterval(loadSchedule, 30000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return { refresh: loadSchedule };
}
