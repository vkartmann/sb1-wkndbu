import React, { useState, useEffect } from 'react';
import { Position, calculateHourlyRate, calculateTotalReturnStats } from './utils/calculations';
import { PositionInput } from './components/PositionInput';
import { LiveCounter } from './components/LiveCounter';
import { ReturnStatsDisplay } from './components/ReturnStatsDisplay';
import { PlusCircle } from 'lucide-react';
import { savePositions, loadPositions } from './utils/storage';

export default function App() {
  const [positions, setPositions] = useState<Position[]>(() => loadPositions());

  const handleAddPosition = () => {
    const newPositions = [...positions, { name: '', apr: 0, positionSize: 0 }];
    setPositions(newPositions);
    savePositions(newPositions);
  };

  const handleUpdatePosition = (index: number, updatedPosition: Position) => {
    const newPositions = [...positions];
    newPositions[index] = updatedPosition;
    setPositions(newPositions);
    savePositions(newPositions);
  };

  const handleDeletePosition = (index: number) => {
    if (positions.length > 1) {
      const newPositions = positions.filter((_, i) => i !== index);
      setPositions(newPositions);
      savePositions(newPositions);
    }
  };

  const totalStats = calculateTotalReturnStats(positions);

  useEffect(() => {
    savePositions(positions);
  }, [positions]);

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 mb-4">
          <h1 className="text-xl font-bold text-gray-100 mb-4">Funding Rate Calculator</h1>
          
          <div className="space-y-2">
            {positions.map((position, index) => (
              <PositionInput
                key={index}
                position={position}
                onChange={(updatedPosition) => handleUpdatePosition(index, updatedPosition)}
                onDelete={() => handleDeletePosition(index)}
                hourlyRate={calculateHourlyRate(position.apr, position.positionSize)}
              />
            ))}
          </div>

          <button
            onClick={handleAddPosition}
            className="mt-3 flex items-center gap-2 px-3 py-1.5 text-blue-400 hover:bg-gray-700 rounded-md transition-colors text-sm"
          >
            <PlusCircle size={16} />
            Add Position
          </button>

          <div className="mt-4 space-y-3">
            <ReturnStatsDisplay stats={totalStats} />
            <LiveCounter hourlyRate={totalStats.hourly} />
          </div>
        </div>
      </div>
    </div>
  );
}