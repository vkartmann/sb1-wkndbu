import { Position } from './calculations';

const STORAGE_KEYS = {
  POSITIONS: 'funding-calculator-positions',
  COUNTER_STATE: 'funding-calculator-counter',
} as const;

export interface CounterState {
  lastUpdateTime: number;
  accumulatedValue: number;
}

export const savePositions = (positions: Position[]) => {
  localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(positions));
};

export const loadPositions = (): Position[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.POSITIONS);
  if (!saved) return [{ name: '', apr: 0, positionSize: 0 }];
  return JSON.parse(saved);
};

export const saveCounterState = (state: CounterState) => {
  localStorage.setItem(STORAGE_KEYS.COUNTER_STATE, JSON.stringify(state));
};

export const loadCounterState = (): CounterState | null => {
  const saved = localStorage.getItem(STORAGE_KEYS.COUNTER_STATE);
  if (!saved) return null;
  return JSON.parse(saved);
};