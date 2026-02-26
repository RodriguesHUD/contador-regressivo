const KEY = "countdown.targetIso";

export function getTargetIso(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setTargetIso(iso: string) {
  try {
    localStorage.setItem(KEY, iso);
  } catch {
    // ignore
  }
}

export function clearTargetIso() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
