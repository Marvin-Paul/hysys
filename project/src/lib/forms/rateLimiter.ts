const WINDOW_KEY = 'marmidon-rate-limit';

interface RateLimitRecord {
  count: number;
  first: number;
}

function getRecords(): Record<string, RateLimitRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(WINDOW_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setRecords(records: Record<string, RateLimitRecord>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(WINDOW_KEY, JSON.stringify(records));
}

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const records = getRecords();
  const now = Date.now();
  const record = records[key];
  if (!record || now - record.first > windowMs) {
    records[key] = { count: 1, first: now };
    setRecords(records);
    return true;
  }
  if (record.count >= limit) return false;
  record.count += 1;
  setRecords(records);
  return true;
}

export function getRateLimitRemaining(key: string, windowMs: number): number {
  const records = getRecords();
  const record = records[key];
  if (!record || Date.now() - record.first > windowMs) return 0;
  return Math.max(0, windowMs - (Date.now() - record.first));
}
