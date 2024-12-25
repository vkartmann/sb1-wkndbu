import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="p-3 bg-gray-700 rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <span className="text-lg font-bold text-blue-400">
          ${value.toFixed(2)}
        </span>
      </div>
    </div>
  );
}