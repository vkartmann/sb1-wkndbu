import React from 'react';

interface PositionFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
  type: 'text' | 'number';
  step?: string;
}

export function PositionField({ label, value, onChange, placeholder, type, step }: PositionFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
        placeholder={placeholder}
        step={step}
      />
    </div>
  );
}