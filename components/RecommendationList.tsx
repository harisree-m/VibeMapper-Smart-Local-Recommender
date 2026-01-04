
import React from 'react';

interface RecommendationListProps {
  content: string;
  links: { title: string; uri: string }[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ content, links }) => {
  const formattedContent = content.split('\n').map((line, i) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return <div key={i} className="h-2" />;

    if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
      return (
        <li key={i} className="mb-3 ml-4 text-slate-700 list-disc leading-relaxed">
          {trimmedLine.replace(/^[*|-]\s*/, '')}
        </li>
      );
    }
    
    // Header-like numbers
    if (trimmedLine.match(/^\d\./)) {
      return (
        <h4 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3 border-l-4 border-indigo-500 pl-4">
          {trimmedLine}
        </h4>
      );
    }
    
    return (
      <p key={i} className="mb-4 text-slate-800 leading-relaxed font-medium">
        {trimmedLine}
      </p>
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-white">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            AI Curated Spots
          </h2>
        </div>
        
        <div className="max-w-none text-slate-800">
          {formattedContent}
        </div>

        {links.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Verified Map Locations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl border border-slate-200 hover:border-indigo-400 transition-all group"
                >
                  <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                    <img src="https://www.gstatic.com/images/branding/product/2x/maps_96dp.png" alt="Maps" className="w-7 h-7" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-slate-900 truncate text-lg">{link.title}</p>
                    <p className="text-sm text-indigo-600 font-bold flex items-center gap-1">
                      Explore on Maps
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationList;
