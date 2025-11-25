import React, { useState, useEffect, useMemo } from 'react';
import { Plane, Calendar, Wallet, CheckCircle2, CloudSun } from 'lucide-react';
import { ITINERARY_DATA, FLIGHT_SCHEDULE } from './constants';
import { ItineraryView } from './components/ItineraryView';
import { EssentialsView } from './components/EssentialsView';
import { BudgetView } from './components/BudgetView';
import { WeatherForecastView } from './components/WeatherForecastView';

// Initialize AI Client (Safe to initialize here as we use env var in services, 
// but checking if key exists is good practice for UI feedback)
export const hasApiKey = !!process.env.API_KEY;

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'essentials' | 'budget' | 'weather'>('itinerary');
  const [completedItems, setCompletedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedItems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Calculate Progress
  const totalItems = useMemo(() => {
    return ITINERARY_DATA.reduce((acc, day) => acc + day.activities.length, 0);
  }, []);

  const progress = Math.round((completedItems.size / totalItems) * 100);

  // Persist checked items
  useEffect(() => {
    localStorage.setItem('completedItems', JSON.stringify(Array.from(completedItems)));
  }, [completedItems]);

  // Flight Notification Check Logic
  useEffect(() => {
    const checkFlightReminders = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      const now = new Date().getTime();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      FLIGHT_SCHEDULE.forEach(flight => {
        const flightTime = new Date(flight.time).getTime();
        const timeDiff = flightTime - now;
        const storageKey = `notified_${flight.id}`;

        // If within 24 hours AND in the future AND not yet notified
        if (timeDiff > 0 && timeDiff <= TWENTY_FOUR_HOURS) {
           const hasNotified = localStorage.getItem(storageKey);
           
           if (!hasNotified) {
             new Notification(flight.title, {
               body: flight.message,
               icon: 'https://cdn-icons-png.flaticon.com/512/2200/2200326.png',
               tag: flight.id // Prevents duplicate notifications on some systems
             });
             
             // Mark as notified to avoid spamming on reload
             localStorage.setItem(storageKey, 'true');
           }
        }
      });
    };

    checkFlightReminders();
  }, []);

  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative shadow-2xl overflow-hidden">
      {/* Sticky Header with Progress */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-korea-blue tracking-tight">Seoul, Namiseom 5 days Trip 🇰🇷</h1>
          <div className="text-xs font-medium text-slate-500">{progress}% 完成</div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-korea-blue to-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pb-24 pt-2">
        {activeTab === 'itinerary' && (
          <ItineraryView completedItems={completedItems} onToggle={toggleItem} />
        )}
        {activeTab === 'essentials' && (
          <EssentialsView />
        )}
        {activeTab === 'budget' && (
          <BudgetView />
        )}
        {activeTab === 'weather' && (
          <WeatherForecastView />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 flex justify-between items-center py-3 px-6 z-50 pb-safe">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${activeTab === 'itinerary' ? 'text-korea-blue' : 'text-slate-400'}`}
        >
          <Calendar size={24} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">行程</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${activeTab === 'weather' ? 'text-korea-blue' : 'text-slate-400'}`}
        >
          <CloudSun size={24} strokeWidth={activeTab === 'weather' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">天氣</span>
        </button>

        <button 
          onClick={() => setActiveTab('essentials')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${activeTab === 'essentials' ? 'text-korea-blue' : 'text-slate-400'}`}
        >
          <Plane size={24} strokeWidth={activeTab === 'essentials' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">資訊</span>
        </button>

        <button 
          onClick={() => setActiveTab('budget')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${activeTab === 'budget' ? 'text-korea-blue' : 'text-slate-400'}`}
        >
          <Wallet size={24} strokeWidth={activeTab === 'budget' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">預算</span>
        </button>
      </nav>
    </div>
  );
}