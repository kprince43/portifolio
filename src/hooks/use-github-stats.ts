"use client";
import { useCallback, useEffect, useState } from "react";
import { fetchGithubStats, type GithubStatsResult } from "@/lib/github";

export function useGithubStats(username: string) {
  const [data, setData] = useState<GithubStatsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchGithubStats(username)
      .then(r => { if (!cancelled) setData(r); })
      .catch((e: unknown) => { if (!cancelled) setError(e instanceof Error ? e.message : "Error"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [username, attempt]);

  const retry = useCallback(() => setAttempt(a => a + 1), []);
  return { data, loading, error, retry };
}
