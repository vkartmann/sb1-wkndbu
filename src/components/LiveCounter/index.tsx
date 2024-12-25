import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import { saveCounterState, loadCounterState } from '../../utils/storage';

interface LiveCounterProps {
  hourlyRate: number;
}

export function LiveCounter({ hourlyRate }: LiveCounterProps) {
  const [accumulatedValue, setAccumulatedValue] = useState(() => {
    const saved = loadCounterState();
    return saved?.accumulatedValue ?? 0;
  });
  
  const [startTime, setStartTime] = useState(() => {
    const saved = loadCounterState();
    return saved?.startTime ?? Date.now();
  });

  const calculateAccumulated = useCallback(() => {
    const currentTime = Date.now();
    const hoursElapsed = (currentTime - startTime) / (1000 * 60 * 60);
    return hoursElapsed * hourlyRate;
  }, [hourlyRate, startTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newValue = calculateAccumulated();
      setAccumulatedValue(newValue);
      saveCounterState({ startTime, accumulatedValue: newValue });
    }, 100);

    return () => clearInterval(intervalId);
  }, [calculateAccumulated, startTime]);

  const handleReset = () => {
    const newStartTime = Date.now();
    setStartTime(newStartTime);
    setAccumulatedValue(0);
    saveCounterState({ startTime: newStartTime, accumulatedValue: 0 });
  };

  return (
    <div className="bg-gray-700 p-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-gray-200">Live Earnings</h3>
          <p className="text-xs text-gray-400">Since last reset</p>
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 text-gray-400 hover:bg-gray-600 rounded transition-colors"
          title="Reset counter"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="mt-1">
        <span className="text-xl font-bold text-green-400">
          ${accumulatedValue.toFixed(6)}
        </span>
      </div>
    </div>
  );
}