const SESSION_KEY = "sbcd_auth";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    if (Date.now() - ts > WEEK_MS) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
