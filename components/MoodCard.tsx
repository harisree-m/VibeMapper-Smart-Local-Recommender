
import React from 'react';
import { Mood } from '../types';

interface MoodCardProps {
  mood: Mood;
  isActive: boolean;
  onClick: () => void;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-300 text-left w-full h-full
        ${isActive 
          ? `${mood.color} border-current ring-4 ring-indigo-500 ring-opacity-10 shadow-md` 
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xl shadow-sm'
        }`}
    >
      <div className="text-4xl mb-4 grayscale-[0.5] group-hover:grayscale-0 transition-all">
        {mood.icon}
      </div>
      <h3 className={`font-bold text-xl mb-2 ${isActive ? 'text-inherit' : 'text-slate-900'}`}>
        {mood.label}
      </h3>
      <p className={`text-sm leading-relaxed ${isActive ? 'opacity-90' : 'text-slate-500'}`}>
        {mood.description}
      </p>
      
      {isActive && (
        <div className="absolute top-4 right-4 text-current">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default MoodCard;
