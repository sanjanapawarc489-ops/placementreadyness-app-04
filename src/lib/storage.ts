import type { AnalysisResult } from './skillExtractor';

const STORAGE_KEY = 'placement_readiness_history';

export function getHistory(): AnalysisResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function saveToHistory(result: AnalysisResult): void {
  try {
    const history = getHistory();
    // Add new entry at the beginning
    history.unshift(result);
    // Keep only last 50 entries
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getHistoryItem(id: string): AnalysisResult | null {
  try {
    const history = getHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error reading history item:', error);
    return null;
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}
