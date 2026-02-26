import { useState } from "react";
import { toLocalDatetimeValue } from "../utils/times";

type Props = {
  initialIso?: string | null;
  onDismiss: () => void;
  onConfirm: (targetIso: string) => void;
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

export function DatePickerModal({ initialIso, onDismiss, onConfirm }: Props) {
  const [value, setValue] = useState<string>(() => {
    // roda só na montagem (não é render)
    if (initialIso) {
      const d = new Date(initialIso);
      if (!Number.isNaN(d.getTime())) return toLocalDatetimeValue(d);
    }
    return toLocalDatetimeValue(new Date(Date.now() + 60 * 60 * 1000));
  });

  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const d = parseDatetimeLocal(value);
    if (!d) return setError("Data inválida.");

    if (d.getTime() <= Date.now()) {
      return setError("Escolha uma data/hora no futuro.");
    }

    onConfirm(d.toISOString());
    onDismiss();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        // clicar fora fecha
        if (e.target === e.currentTarget) onDismiss();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onDismiss();
      }}
    >
      <div className="w-[min(520px,92vw)] rounded-2xl border border-white/15 bg-slate-950/90 p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold">
              Defina o alvo do contador
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Escolha uma data/hora no futuro para iniciar o contador
              regressivo.
            </p>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <label className="text-sm font-medium text-white/80">
            Data e hora
          </label>

          <input
            autoFocus
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
          />

          {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-white/90"
            >
              Iniciar contador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
