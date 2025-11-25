import React, { useEffect, useRef, useState } from 'react';
import { ITINERARY_DATA, DAY_COLORS } from '../constants';
import { Calendar, MapPin, ExternalLink, Play, Map as MapIcon, ChevronRight, Target, Activity } from 'lucide-react';
import { Activity as ActivityType } from '../types';

declare global {
  interface Window {
    L: any;
  }
}

interface HomeViewProps {
  progress: number;
  onNavigate: (tab: 'itinerary' | 'essentials' | 'budget' | 'weather') => void;
  setItineraryDay: (day: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ progress, onNavigate, setItineraryDay }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<{activity: ActivityType, day: number} | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    // Initialize Map
    const map = window.L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
    });

    // CartoDB Positron (Clean Light Theme)
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    const markers: any[] = [];

    // Iterate through days to process markers
    ITINERARY_DATA.forEach((day) => {
        let sightseeingCount = 0;

        day.activities.forEach((activity) => {
            // Only show Sightseeing locations on the interactive map
            if (activity.lat && activity.lng && activity.type === 'sightseeing') {
                sightseeingCount++;
                const dayColor = DAY_COLORS[day.day] || '#64748b'; // Default slate if out of bounds

                // Create Custom Numbered Marker HTML
                const markerHtml = `
                    <div style="
                        background-color: ${dayColor};
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        border: 2px solid white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-family: 'JetBrains Mono', monospace;
                        font-weight: 800;
                        font-size: 12px;
                        position: relative;
                    ">
                        ${sightseeingCount}
                        <div style="
                            position: absolute;
                            bottom: -6px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 0; 
                            height: 0; 
                            border-left: 6px solid transparent;
                            border-right: 6px solid transparent;
                            border-top: 6px solid ${dayColor};
                        "></div>
                    </div>
                `;

                const icon = window.L.divIcon({
                    className: 'custom-map-marker', // Dummy class to prevent default leaflet styles from interfering too much
                    html: markerHtml,
                    iconSize: [24, 30], // Height includes the little triangle
                    iconAnchor: [12, 30] // Tip of the marker
                });

                const marker = window.L.marker([activity.lat, activity.lng], { icon })
                    .addTo(map);
                
                markers.push(marker);

                // Interaction
                marker.on('click', () => {
                    setSelectedActivity({ activity, day: day.day });
                    map.flyTo([activity.lat!, activity.lng!], 14, { duration: 1 });
                });
            }
        });
    });

    // Auto Zoom to fit all markers
    if (markers.length > 0) {
        const group = window.L.featureGroup(markers);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    return () => {
        map.remove();
    };
  }, []);

  const handleJumpToItinerary = () => {
      if (selectedActivity) {
          setItineraryDay(selectedActivity.day);
          onNavigate('itinerary');
      }
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Status Card (HUD Style) */}
      <div className="bg-white p-5 rounded-lg border border-slate-300 relative overflow-hidden group shadow-sm">
        <div className="absolute top-0 right-0 p-2 opacity-10">
            <Target size={100} />
        </div>
        <div className="corner-accent top-left"></div>
        <div className="corner-accent top-right"></div>
        <div className="corner-accent bottom-left"></div>
        <div className="corner-accent bottom-right"></div>
        
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">Mission Dashboard</h2>
                <p className="text-cyan-600 text-xs font-mono tracking-wider">STATUS: ACTIVE // DAY {new Date().getDate() > 16 && new Date().getDate() < 22 ? new Date().getDate() - 16 : 'PRE'}</p>
            </div>
            <Activity className="text-slate-300" />
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
            <div className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 font-mono">Completion Rate</div>
                <div className="text-3xl font-black text-slate-800 font-mono tracking-tighter">
                    {progress}<span className="text-sm text-slate-400">%</span>
                </div>
                <div className="w-full bg-slate-200 h-1 mt-2">
                    <div className="bg-cyan-500 h-1 transition-all" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <button 
                onClick={() => onNavigate('itinerary')}
                className="group flex flex-col items-center justify-center bg-slate-900 hover:bg-cyan-600 text-white w-16 h-16 rounded transition-all shadow-lg active:scale-95 border border-slate-800"
            >
                <Play size={24} fill="currentColor" className="ml-1 group-hover:text-white" />
                <span className="text-[8px] font-mono mt-1 font-bold">START</span>
            </button>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-2">
                <MapIcon size={12} className="text-cyan-600" /> 
                Tactical Map Overview
            </h3>
            {/* Map Legend */}
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(d => (
                    <div key={d} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: DAY_COLORS[d] }}></div>
                        <span className="text-[8px] font-mono font-bold text-slate-400">D{d}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="relative rounded-lg overflow-hidden border border-slate-300 shadow-sm h-[320px] bg-slate-100 group">
            {/* Map Container */}
            <div ref={mapContainerRef} className="w-full h-full z-0 font-mono"></div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* Selected Activity Overlay */}
            {selectedActivity ? (
                 <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-900 p-0 rounded shadow-2xl animate-in slide-in-from-bottom-2 z-[1000] overflow-hidden">
                    <div className="px-4 py-2 flex justify-between items-center" style={{ backgroundColor: DAY_COLORS[selectedActivity.day] }}>
                         <span className="text-[10px] font-bold text-white font-mono uppercase">
                                Sector: Day {selectedActivity.day}
                        </span>
                        <button onClick={() => setSelectedActivity(null)} className="text-white/80 hover:text-white font-mono text-xs">[CLOSE]</button>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{selectedActivity.activity.title}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-mono">
                             <MapPin size={10} /> {selectedActivity.activity.lat?.toFixed(4)}, {selectedActivity.activity.lng?.toFixed(4)}
                        </div>
                        <button 
                            onClick={handleJumpToItinerary}
                            className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            Access Data Log <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2 py-1 border border-slate-300 shadow-sm">
                    <span className="text-[9px] text-slate-500 font-mono font-bold">
                        AWAITING TARGET SELECTION...
                    </span>
                </div>
            )}
        </div>
      </div>

      {/* Trip Briefing / Summary Timeline */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono flex items-center gap-2 px-1">
            <Calendar size={12} className="text-cyan-600" /> 
            Operation Sequence
        </h3>
        
        <div className="space-y-2">
            {ITINERARY_DATA.map((day) => (
                <div 
                    key={day.day} 
                    className="bg-white p-3 rounded border border-slate-200 hover:border-cyan-400 transition-colors cursor-pointer group flex items-center gap-4"
                    onClick={() => {
                        setItineraryDay(day.day);
                        onNavigate('itinerary');
                    }}
                >
                    <div 
                        className="flex flex-col items-center justify-center w-10 h-10 border transition-colors"
                        style={{ 
                            backgroundColor: `${DAY_COLORS[day.day]}15`, // 10% opacity hex
                            borderColor: `${DAY_COLORS[day.day]}40`,
                            color: DAY_COLORS[day.day]
                        }}
                    >
                        <span className="text-[8px] font-mono uppercase">Day</span>
                        <span className="text-sm font-bold font-mono">{day.day}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-cyan-700 transition-colors font-sans">{day.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] bg-slate-100 px-1 rounded text-slate-500 font-mono">{day.date.split(' ')[0]}</span>
                            <span className="text-[10px] text-slate-400 font-mono"> // {day.activities.length} OPS</span>
                        </div>
                    </div>
                    
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-cyan-500" />
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};