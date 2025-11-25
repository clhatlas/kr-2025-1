import React, { useState, useEffect, useMemo } from 'react';
import { Plane, Calendar, Wallet, CheckCircle2, CloudSun, Home, Map, Activity, Zap } from 'lucide-react';
import { ITINERARY_DATA, FLIGHT_SCHEDULE } from './constants';
import { HomeView } from './components/HomeView';
import { ItineraryView } from './components/ItineraryView';
import { EssentialsView } from './components/EssentialsView';
import { BudgetView } from './components/BudgetView';
import { WeatherForecastView } from './components/WeatherForecastView';

export const hasApiKey = !!process.env.API_KEY;

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'itinerary' | 'essentials' | 'budget' | 'weather'>('home');
  const [itineraryDay, setItineraryDay] = useState(1);
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

  // Flight Notification Logic
  useEffect(() => {
    const checkFlightReminders = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const now = new Date().getTime();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
      FLIGHT_SCHEDULE.forEach(flight => {
        const flightTime = new Date(flight.time).getTime();
        const timeDiff = flightTime - now;
        const storageKey = `notified_${flight.id}`;
        if (timeDiff > 0 && timeDiff <= TWENTY_FOUR_HOURS) {
           const hasNotified = localStorage.getItem(storageKey);
           if (!hasNotified) {
             new Notification(flight.title, {
               body: flight.message,
               icon: 'https://cdn-icons-png.flaticon.com/512/2200/2200326.png',
               tag: flight.id
             });
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
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden font-sans text-slate-800 bg-white/50">
      
      {/* Sticky Tech Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1 rounded-sm">
                <Map size={16} />
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tighter uppercase font-mono">
              SEOUL<span className="text-cyan-600">_OS</span> <span className="text-xs text-slate-400">v2.5</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-cyan-500 animate-pulse'}`}></div>
            <div className="text-xs font-bold text-slate-500 font-mono tracking-widest">{progress.toString().padStart(3, '0')}%</div>
          </div>
        </div>
        
        {/* Tech Progress Bar */}
        <div className="w-full bg-slate-100 h-1 overflow-hidden flex gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
             <div 
                key={i} 
                className={`flex-1 h-full transition-colors duration-300 ${i < (progress / 5) ? 'bg-cyan-600' : 'bg-slate-200'}`} 
             />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 pt-2 relative z-10">
        {activeTab === 'home' && (
            <HomeView 
              progress={progress} 
              onNavigate={setActiveTab} 
              setItineraryDay={setItineraryDay}
            />
        )}
        {activeTab === 'itinerary' && (
          <ItineraryView 
            completedItems={completedItems} 
            onToggle={toggleItem} 
            selectedDay={itineraryDay}
            onDayChange={setItineraryDay}
          />
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

      {/* Futuristic Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-slate-200 flex justify-between items-center px-2 py-2 z-50 pb-safe">
        {[
          { id: 'home', icon: Home, label: 'CMD' },
          { id: 'itinerary', icon: Activity, label: 'LOG' },
          { id: 'weather', icon: CloudSun, label: 'ENV' },
          { id: 'essentials', icon: Zap, label: 'DAT' },
          { id: 'budget', icon: Wallet, label: 'FIN' },
        ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center w-full h-14 gap-1 rounded transition-all duration-200 group
                ${activeTab === item.id ? 'bg-slate-50 border-t-2 border-cyan-500' : 'hover:bg-slate-50 border-t-2 border-transparent'}
              `}
            >
              <item.icon 
                size={20} 
                className={`transition-colors ${activeTab === item.id ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                strokeWidth={2}
              />
              <span className={`text-[9px] font-mono font-bold tracking-widest ${activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
        ))}
      </nav>
    </div>
  );
}