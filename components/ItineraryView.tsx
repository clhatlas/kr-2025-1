import React from 'react';
import { ITINERARY_DATA } from '../constants';
import { ActivityCard } from './ActivityCard';
import { WeatherWidget } from './WeatherWidget';

interface ItineraryViewProps {
  completedItems: Set<string>;
  onToggle: (id: string) => void;
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ completedItems, onToggle, selectedDay, onDayChange }) => {
  const currentItinerary = ITINERARY_DATA.find(d => d.day === selectedDay);

  const representativeActivity = currentItinerary?.activities.find((a, i) => i === 2 && (a.lat && a.lng)) 
    || currentItinerary?.activities.find(a => a.type === 'sightseeing' && a.lat)
    || currentItinerary?.activities[0];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      {/* Date Tabs (Technical Pills) */}
      <div className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-2">
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.day}
              onClick={() => onDayChange(day.day)}
              className={`flex-shrink-0 flex flex-col items-center min-w-[72px] px-2 py-2 border transition-all duration-200
                ${selectedDay === day.day 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-cyan-400'
                }
              `}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest font-mono">Day.{day.day}</span>
              <span className="text-xs font-bold mt-1 font-sans">{day.date.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-4">
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
            <div className="min-w-0 flex-1 pr-2">
                <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 border border-cyan-100 uppercase tracking-widest font-mono mb-2 inline-block">
                    Operation Log
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight truncate uppercase">{currentItinerary?.title}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1 font-mono">
                    DATE: {currentItinerary?.date}
                </p>
            </div>
            {/* Weather Widget */}
            {representativeActivity && representativeActivity.lat && representativeActivity.lng && (
                <WeatherWidget 
                    lat={representativeActivity.lat} 
                    lng={representativeActivity.lng}
                    locationName={representativeActivity.location} 
                />
            )}
        </div>

        <div className="relative border-l border-dashed border-slate-300 ml-3 pl-8 space-y-6">
          {currentItinerary?.activities.map((activity) => (
            <div key={activity.id} className="relative group">
              {/* Timeline Node (Square) */}
              <div className={`absolute -left-[37px] top-6 w-4 h-4 border-2 transition-all duration-300 z-10 flex items-center justify-center bg-slate-50
                 ${completedItems.has(activity.id) 
                    ? 'border-green-500' 
                    : 'border-slate-300 group-hover:border-cyan-500'
                 }
              `}>
                  {completedItems.has(activity.id) && <div className="w-2 h-2 bg-green-500"></div>}
                  {!completedItems.has(activity.id) && <div className="w-1.5 h-1.5 bg-slate-300 group-hover:bg-cyan-500 transition-colors"></div>}
              </div>
               
              <ActivityCard 
                activity={activity} 
                isCompleted={completedItems.has(activity.id)} 
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center py-10 text-slate-300 text-[10px] font-mono tracking-widest uppercase">
            // END OF LOG FILE //
        </div>
      </div>
    </div>
  );
};