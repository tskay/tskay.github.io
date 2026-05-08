
import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Thinking..." }) => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-80 flex flex-col items-center justify-center z-50 p-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-400 mb-6"></div>
      <p className="text-sky-300 text-xl font-semibold text-center">{message}</p>
    </div>
  );
};
