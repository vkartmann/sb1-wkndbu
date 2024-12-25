import React from 'react';
import { Position, calculateReturnStats } from '../utils/calculations';
import { Trash2 } from 'lucide-react';

interface PositionInputProps {
  position: Position;
  onChange: (updatedPosition: Position) => void;
  onDelete: () => void;
  hourlyRate: number;
}

export function PositionInput({ position, onChange, onDelete, hourlyRate }: PositionInputProps) {
  const hourlyAprPercentage = (position.apr / (365 * 24)).toFixed(6);
  const stats = calculateReturnStats(position.apr, position.positionSize);

  return (
    <div className="bg-gray-700 p-3 rounded-lg">
      <div className="grid grid-cols-6 gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-400">Name</label>
          <input
            type="text"
            value={position.name}
            onChange={(e) => onChange({ ...position, name: e.target.value })}
            className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            placeholder="Position name"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-400">Yearly APR %</label>
          <input
            type="number"
            value={position.apr}
            onChange={(e) => onChange({ ...position, apr: parseFloat(e.target.value) || 0 })}
            className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-400">Hourly APR %</label>
          <input
            type="text"
            value={hourlyAprPercentage}
            className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-gray-100"
            readOnly
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-400">Position Size (USD)</label>
          <input
            type="number"
            value={position.positionSize}
            onChange={(e) => onChange({ ...position, positionSize: parseFloat(e.target.value) || 0 })}
            className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-400">Hourly Earnings</label>
          <input
            type="text"
            value={`$${stats.hourly.toFixed(6)}/h`}
            className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-gray-100"
            readOnly
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            onClick={onDelete}
            className="p-1 text-red-400 hover:bg-gray-600 rounded"
            title="Delete position"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}