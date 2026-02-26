type Props = {
  value: string;
  label: string;
};

export function TimeUnitCard({ value, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-35 md:w-42.5 rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
        <div className="flex h-30 md:h-35 items-center justify-center">
          <span className="font-mono text-6xl md:text-7xl font-semibold tracking-wider text-white/90">
            {value}
          </span>
        </div>
        <div className="h-px bg-white/15" />
        <div className="py-3 text-center text-sm font-semibold tracking-[0.2em] text-white/70">
          {label}
        </div>
      </div>
    </div>
  );
}
