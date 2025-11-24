import React, { useState } from 'react';
import { ITINERARY_DATA } from '../constants';
import { ActivityCard } from './ActivityCard';
import { WeatherWidget } from './WeatherWidget';

interface ItineraryViewProps {
  completedItems: Set<string>;
  onToggle: (id: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ completedItems, onToggle }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  const currentItinerary = ITINERARY_DATA.find(d => d.day === selectedDay);

  // Logic to find a representative activity for weather (prioritize mid-day or specific spots)
  // Default to the 3rd item if available, otherwise 1st, or try to find a 'stay' or 'sightseeing' type
  const representativeActivity = currentItinerary?.activities.find((a, i) => i === 2 && (a.lat && a.lng)) 
    || currentItinerary?.activities.find(a => a.type === 'sightseeing' && a.lat)
    || currentItinerary?.activities[0];

  return (
    <div className="flex flex-col h-full">
      {/* Date Tabs (Scrollable) */}
      <div className="sticky top-[72px] z-40 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3">
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`flex-shrink-0 flex flex-col items-center min-w-[70px] px-3 py-2 rounded-xl border transition-all
                ${selectedDay === day.day 
                  ? 'bg-korea-blue text-white border-korea-blue shadow-md scale-105' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }
              `}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Day {day.day}</span>
              <span className="text-sm font-bold">{day.date.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-4">
        <div className="mb-6 flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{currentItinerary?.title}</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">{currentItinerary?.date}</p>
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

        <div className="relative border-l-2 border-slate-200 ml-3 pl-6 space-y-6">
          {currentItinerary?.activities.map((activity) => (
            <div key={activity.id} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] top-6 w-4 h-4 rounded-full border-2 bg-white transition-colors
                 ${completedItems.has(activity.id) ? 'border-green-500 bg-green-50' : 'border-slate-300'}
              `}></div>
              
              <ActivityCard 
                activity={activity} 
                isCompleted={completedItems.has(activity.id)} 
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
        
        {/* End of Day Message */}
        <div className="text-center py-8 text-slate-400 text-sm">
            End of Day {selectedDay}
        </div>
      </div>
    </div>
  );
};