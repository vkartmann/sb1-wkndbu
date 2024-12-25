import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { saveCounterState, loadCounterState } from '../utils/storage';

interface LiveCounterProps {
  hourlyRate: number;
}

export function LiveCounter({ hourlyRate }: LiveCounterProps) {
  const [accumulatedValue, setAccumulatedValue] = useState(() => {
    const saved = loadCounterState();
    return saved?.accumulatedValue ?? 0;
  });
  
  const [lastUpdateTime, setLastUpdateTime] = useState(() => {
    const saved = loadCounterState();
    return saved?.lastUpdateTime ?? Date.now();
  });

  const [currentRate, setCurrentRate] = useState(hourlyRate);

  useEffect(() => {
    setCurrentRate(hourlyRate);
  }, [hourlyRate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const hoursElapsed = (now - lastUpdateTime) / (1000 * 60 * 60);
      const newEarnings = hoursElapsed * currentRate;
      const newTotal = accumulatedValue + newEarnings;
      
      setAccumulatedValue(newTotal);
      setLastUpdateTime(now);
      
      saveCounterState({ 
        lastUpdateTime: now, 
        accumulatedValue: newTotal 
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [accumulatedValue, lastUpdateTime, currentRate]);

  const handleReset = () => {
    const now = Date.now();
    setLastUpdateTime(now);
    setAccumulatedValue(0);
    saveCounterState({ 
      lastUpdateTime: now, 
      accumulatedValue: 0 
    });
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