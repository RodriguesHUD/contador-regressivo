export type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isDone: boolean;
};

export function diffToParts(diffMs: number): TimeParts {
  const clamped = Math.max(0, diffMs);
  const totalSeconds = Math.floor(clamped / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isDone: clamped === 0 };
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toLocalDatetimeValue(d: Date) {
  const pad = (x: number) => String(x).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
