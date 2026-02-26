import { useMemo, useState } from "react";
import { clearTargetIso, getTargetIso, setTargetIso } from "@/shared/storage";
import { StartCountdownCard } from "./components/StartCountdownCard";
import { useCountdown } from "./hooks/useCountdown";
import { TimeUnitCard } from "./components/TimeUnitCard";
import { pad2 } from "./utils/times";

export function CountdownPage() {
  const [targetIso, setTargetIsoState] = useState<string | null>(() =>
    getTargetIso(),
  );

  const targetDate = useMemo(() => {
    if (!targetIso) return null;
    const d = new Date(targetIso);
    return Number.isNaN(d.getTime()) ? null : d;
  }, [targetIso]);

  const parts = useCountdown(targetDate);

  function handleStart(iso: string) {
    setTargetIso(iso);
    setTargetIsoState(iso);
  }

  function handleChangeDate() {
    clearTargetIso();
    setTargetIsoState(null);
  }

  if (!targetIso) {
    return (
      <div className="min-h-screen bg-linear-to-r from-indigo-950 via-slate-950 to-purple-950">
        <StartCountdownCard onStart={handleStart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-950 via-slate-950 to-purple-950">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <main className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <TimeUnitCard
                value={String(parts?.days ?? 0).padStart(2, "0")}
                label="DAYS"
              />
              <TimeUnitCard value={pad2(parts?.hours ?? 0)} label="HOURS" />
              <TimeUnitCard value={pad2(parts?.minutes ?? 0)} label="MINUTES" />
              <TimeUnitCard value={pad2(parts?.seconds ?? 0)} label="SECONDS" />
            </div>

            <button
              onClick={handleChangeDate}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Alterar data
            </button>

            {parts?.isDone ? (
              <p className="text-sm font-semibold text-white/80">
                ⏳ Tempo esgotado! Selecione outra data para reiniciar.
              </p>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
