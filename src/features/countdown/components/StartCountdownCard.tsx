import { useMemo, useState } from "react";
import { toLocalDatetimeValue } from "../utils/times";

type Props = {
  onStart: (targetIso: string) => void;
};

function parseDatetimeLocal(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v);
  if (!m) return null;

  const [, y, mo, d, h, mi] = m;
  const date = new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi),
    0,
    0,
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

export function StartCountdownCard({ onStart }: Props) {
  const [mountedAt] = useState(() => Date.now());

  const [value, setValue] = useState(() =>
    toLocalDatetimeValue(new Date(mountedAt + 60 * 60 * 1000)),
  );

  const minValue = useMemo(() => {
    return toLocalDatetimeValue(new Date(mountedAt + 60 * 1000));
  }, [mountedAt]);

  const [error, setError] = useState<string>("");

  function validateAndStart() {
    setError("");

    const d = parseDatetimeLocal(value);
    if (!d) {
      setError("Data inválida.");
      return;
    }

    const minMs = Date.now() + 60 * 1000;

    if (d.getTime() < minMs) {
      setError("Escolha uma data/hora pelo menos 1 minuto no futuro.");
      return;
    }

    onStart(d.toISOString());
  }

  return (
    <div className="min-h-screen px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
        <div className="mx-auto max-w-md px-6 py-14 text-center">
          <div className="card-title mb-8">
            <h2 className="text-3xl font-semibold text-white/90 mb-4">
              Selecione uma data
            </h2>
          </div>
          <div className="card-body">
            <p className="mt-2 text-sm text-white/60">
              Escolha uma data no futuro para iniciar a contagem regressiva.
            </p>

            <div className="mt-4">
              <input
                type="datetime-local"
                min={minValue}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                  const d = parseDatetimeLocal(value);
                  const minMs = Date.now() + 60 * 1000;

                  if (d && d.getTime() < minMs) {
                    setError(
                      "Escolha uma data/hora pelo menos 1 minuto no futuro.",
                    );
                  } else {
                    setError("");
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 outline-none focus:border-white/25"
              />

              {error ? (
                <p className="mt-2 text-sm text-red-300 text-left">{error}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={validateAndStart}
              className="mt-6 w-full rounded-xl bg-purple-800 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 active:bg-cyan-200"
            >
              Iniciar Contador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
