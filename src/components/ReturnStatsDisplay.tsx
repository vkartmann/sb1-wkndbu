import React from 'react';
import type { ReturnStats } from '../utils/calculations';

interface ReturnStatsDisplayProps {
  stats: ReturnStats;
}

export function ReturnStatsDisplay({ stats }: ReturnStatsDisplayProps) {
  const statsConfig = [
    { label: 'Hourly Return', value: stats.hourly },
    { label: 'Daily Return', value: stats.daily },
    { label: 'Weekly Return', value: stats.weekly },
    { label: 'Monthly Return', value: stats.monthly }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statsConfig.map(({ label, value }) => (
        <div key={label} className="p-3 bg-gray-700 rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-400">{label}</span>
            <span className="text-lg font-bold text-blue-400">
              ${value.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}