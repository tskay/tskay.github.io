
import React from 'react';

interface ChoicesProps {
  choices: string[];
  onChoiceSelected: (choice: string) => void;
  disabled: boolean;
}

export const Choices: React.FC<ChoicesProps> = ({ choices, onChoiceSelected, disabled }) => {
  if (!choices || choices.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoiceSelected(choice)}
          disabled={disabled}
          className={`w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-400 text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transform hover:scale-105 disabled:transform-none ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};
