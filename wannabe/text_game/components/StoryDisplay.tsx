
import React from 'react';

interface StoryDisplayProps {
  story: string;
  imageUrl: string | null;
  isInitialLoad: boolean;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, imageUrl, isInitialLoad }) => {
  if (isInitialLoad && !story) {
    return null; // Don't render anything if it's initial load and no story yet
  }
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 mb-6 md:mb-8 transition-all duration-500 ease-in-out">
      {imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-md aspect-video">
          <img 
            src={imageUrl} 
            alt="Adventure scene" 
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 animate-fadeIn" 
            onLoad={(e) => (e.target as HTMLImageElement).style.opacity = '1'}
          />
        </div>
      )}
      {story && (
         <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line animate-fadeIn">
            {story}
        </p>
      )}
    </div>
  );
};

// Add this to your index.html <style> or a global CSS file if you prefer
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.7s ease-out forwards;
}
*/
// For simplicity with Tailwind, often opacity transitions on load are sufficient. 
// The onLoad handler above achieves a similar fade-in for the image.
// Text can be animated with Framer Motion or simple CSS if needed, but keeping it simple for now.
