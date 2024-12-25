import React from 'react';
import type { ReturnStats } from '../../utils/calculations';
import { StatCard } from './StatCard';

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
      {statsConfig.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}