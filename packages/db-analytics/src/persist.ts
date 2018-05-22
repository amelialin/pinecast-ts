function formatKey(key: string): string {
  return `0.db-omnibus.db-analytics.${key}`;
}

export function get(key: string, def: string): string;
export function get(key: string): string | null;
export function get(key: string, def: string | null = null): string | null {
  try {
    return localStorage.getItem(formatKey(key)) || def || null;
  } catch (e) {
    return null;
  }
}

export function set(key: string, value: string) {
  try {
    localStorage.setItem(formatKey(key), value);
  } catch (e) {
    console.error(e);
  }
}
