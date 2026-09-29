// Local Storage helpers

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
  } catch (error) {
    console.warn('localStorage set failed', error);
  }
}

export function getLocalStorage<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  } catch (error) {
    console.warn('localStorage get failed', error);
    return null;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('localStoreage remove failed', error);
  }
}
