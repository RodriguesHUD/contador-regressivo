import { useEffect, useMemo, useState } from "react";
import { diffToParts } from "../utils/times";

export function useCountdown(target: Date | null) {
  const targetMs = target?.getTime() ?? null;
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (!targetMs) return;

    let timeoutId: number | undefined;

    const scheduleNext = () => {
      const now = Date.now();
      const diff = targetMs - now;

      if (diff <= 0) {
        setNowMs(targetMs);
        return;
      }

      setNowMs(now);

      const msToNext = 1000 - (now % 1000);
      timeoutId = window.setTimeout(scheduleNext, msToNext);
    };

    // inicia assíncrono para evitar “setState no body do effect”
    timeoutId = window.setTimeout(scheduleNext, 0);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [targetMs]);

  return useMemo(() => {
    if (!targetMs) return null;
    return diffToParts(targetMs - nowMs);
  }, [targetMs, nowMs]);
}
