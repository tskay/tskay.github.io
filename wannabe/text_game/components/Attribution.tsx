
import React from 'react';
import { SDG7_PORTAL_URL, APP_TITLE } from '../constants';

export const Attribution: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 p-6 md:p-8 mt-12 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400">{APP_TITLE}</h2>
      <div className="max-w-3xl mx-auto space-y-3 text-sm md:text-base">
        <p>
          This interactive adventure aims to raise awareness about the United Nation’s Sustainable Development Goal 7: Affordable and Clean Energy.
        </p>
        <p>
          The UN strives to improve quality of life for everyone. Ensuring access to affordable, reliable, sustainable, and modern energy for all by 2030 is a key part of this global mission.
        </p>
        <p className="font-medium text-emerald-300">
          Learn more about how innovators, funders, and communities are working together to achieve SDG7:
        </p>
      </div>
      <a
        href={SDG7_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Explore SDG7 & Clean Energy
      </a>
      <p className="mt-8 text-xs text-slate-400">
        Game narrative & imagery powered by Google Gemini & Imagen AI.
      </p>
    </footer>
  );
};
