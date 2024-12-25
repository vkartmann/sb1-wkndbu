import React from 'react';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

export function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-400">{label}</label>
      <input
        type="text"
        value={value}
        className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-gray-100"
        readOnly
      />
    </div>
  );
}