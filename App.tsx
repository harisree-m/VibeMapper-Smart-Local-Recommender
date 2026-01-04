
import React, { useState, useEffect } from 'react';
import { AppState, MoodType } from './types';
import { MOODS } from './constants';
import MoodCard from './components/MoodCard';
import RecommendationList from './components/RecommendationList';
import { getPlaceRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    location: null,
    mood: null,
    recommendations: [],
    isLoading: false,
    error: null,
  });

  const [result, setResult] = useState<{ text: string; links: { title: string; uri: string }[] } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          setState(prev => ({ ...prev, error: "Please enable location services to find spots near you." }));
        }
      );
    } else {
      setState(prev => ({ ...prev, error: "Location services are not supported by this browser." }));
    }
  }, []);

  const handleMoodSelect = (moodId: MoodType) => {
    setState(prev => ({ ...prev, mood: moodId, error: null }));
  };

  const handleFindPlaces = async () => {
    if (!state.location || !state.mood) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    setResult(null);

    try {
      const data = await getPlaceRecommendations(state.mood, state.location);
      setResult(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message || "Something went wrong. Try again." }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen pb-20 text-slate-900">
      {/* Header */}
      <header className="glass sticky top-0 z-50 py-5 px-6 border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-indigo-200">
              📍
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">VibeMapper</h1>
              <p className="text-[10px] text-indigo-600 uppercase tracking-[0.2em] font-black">Powered by Gemini AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 py-2 px-4 rounded-full border border-slate-200">
             <div className={`h-2.5 w-2.5 rounded-full ${state.location ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse'}`}></div>
             <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
               {state.location ? 'GPS Ready' : 'Acquiring GPS...'}
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-12">
        {/* Intro Section */}
        <section className="mb-16 text-center lg:text-left">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Find your <span className="text-indigo-600">perfect spot</span> locally.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            Select a mood below and let our AI scout your neighborhood for the best matching locations using real-time Google Maps data.
          </p>
        </section>

        {/* Mood Selection Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOODS.map((mood) => (
              <MoodCard
                key={mood.id}
                mood={mood}
                isActive={state.mood === mood.id}
                onClick={() => handleMoodSelect(mood.id)}
              />
            ))}
          </div>
        </section>

        {/* Action Button */}
        <section className="flex flex-col items-center gap-6 mb-20">
          <button
            onClick={handleFindPlaces}
            disabled={!state.mood || !state.location || state.isLoading}
            className={`w-full max-w-lg py-6 rounded-3xl font-black text-xl transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4
              ${!state.mood || !state.location || state.isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-300 shadow-indigo-100 hover:-translate-y-1'
              }`}
          >
            {state.isLoading ? (
              <>
                <svg className="animate-spin h-7 w-7 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Searching local vibes...</span>
              </>
            ) : (
              <>
                <span>Scout My Area</span>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
          
          {state.error && (
            <div className="bg-rose-50 text-rose-700 px-8 py-4 rounded-2xl border-2 border-rose-100 text-sm font-bold shadow-sm animate-fade-in">
              ⚠️ {state.error}
            </div>
          )}
        </section>

        {/* Results Area */}
        {result && (
          <section id="results" className="scroll-mt-32 pb-20">
            <RecommendationList 
              content={result.text} 
              links={result.links} 
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
               <span className="font-black text-2xl text-slate-900 tracking-tight">VibeMapper</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Hyper-local recommendations powered by Gemini 2.5 Flash.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
