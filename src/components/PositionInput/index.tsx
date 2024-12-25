import React from 'react';
import { Position } from '../../utils/calculations';
import { Trash2 } from 'lucide-react';
import { PositionField } from './PositionField';
import { ReadOnlyField } from './ReadOnlyField';

interface PositionInputProps {
  position: Position;
  onChange: (updatedPosition: Position) => void;
  onDelete: () => void;
  hourlyRate: number;
}

export function PositionInput({ position, onChange, onDelete, hourlyRate }: PositionInputProps) {
  const hourlyAprPercentage = (position.apr / (365 * 24)).toFixed(6);

  return (
    <div className="bg-gray-700 p-3 rounded-lg">
      <div className="grid grid-cols-6 gap-3">
        <PositionField
          label="Name"
          value={position.name}
          onChange={(value) => onChange({ ...position, name: value })}
          placeholder="Position name"
          type="text"
        />
        <PositionField
          label="Yearly APR %"
          value={position.apr}
          onChange={(value) => onChange({ ...position, apr: parseFloat(value) || 0 })}
          placeholder="0.00"
          type="number"
          step="0.01"
        />
        <ReadOnlyField
          label="Hourly APR %"
          value={hourlyAprPercentage}
        />
        <PositionField
          label="Position Size (USD)"
          value={position.positionSize}
          onChange={(value) => onChange({ ...position, positionSize: parseFloat(value) || 0 })}
          placeholder="0.00"
          type="number"
          step="0.01"
        />
        <ReadOnlyField
          label="Hourly Earnings"
          value={`$${hourlyRate.toFixed(6)}/h`}
        />
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