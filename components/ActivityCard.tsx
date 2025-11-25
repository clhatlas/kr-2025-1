import React, { useState } from 'react';
import { MapPin, Navigation, Utensils, Info, Check, Car, Bed, Plane, Sparkles, ChevronUp, Terminal } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isCompleted, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const aiData = activity.aiData;

  const isMajor = activity.type === 'sightseeing' || activity.type === 'flight';

  const getIcon = () => {
    switch (activity.type) {
      case 'food': return <Utensils size={14} />;
      case 'transport': return <Car size={14} />;
      case 'stay': return <Bed size={14} />;
      case 'flight': return <Plane size={14} />;
      default: return <Terminal size={14} />;
    }
  };

  const getTypeColor = () => {
     switch (activity.type) {
      case 'food': return 'text-orange-600 border-orange-200 bg-orange-50';
      case 'transport': return 'text-slate-600 border-slate-200 bg-slate-50';
      case 'sightseeing': return 'text-cyan-600 border-cyan-200 bg-cyan-50';
      case 'stay': return 'text-indigo-600 border-indigo-200 bg-indigo-50';
      case 'flight': return 'text-rose-600 border-rose-200 bg-rose-50';
      default: return 'text-slate-600 border-slate-200 bg-slate-50';
    }
  };

  const handleAiAnalysis = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activity.location)}`;
  
  const getNaverNavUrl = () => {
    const appName = 'KoreaTrip2025';
    if (activity.lat && activity.lng) {
        return `nmap://route/car?dlat=${activity.lat}&dlng=${activity.lng}&dname=${encodeURIComponent(activity.location)}&appname=${appName}`;
    } else {
        return `nmap://search?query=${encodeURIComponent(activity.location)}&appname=${appName}`;
    }
  };

  const naverNavUrl = getNaverNavUrl();
  const isInteractiveType = ['sightseeing', 'food'].includes(activity.type);
  const showAiButton = !!aiData && isInteractiveType;

  return (
    <div className={`relative flex flex-col bg-white rounded-lg mb-4 transition-all duration-200 overflow-hidden group
      ${isCompleted ? 'border border-green-300 opacity-60 grayscale' : 'border border-slate-200 shadow-sm'}
      ${isMajor && !isCompleted ? 'border-l-4 border-l-cyan-500' : 'border-l border-l-slate-200'}
    `}>
      
      {/* Tech Decoration Lines */}
      {!isCompleted && <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-slate-200 pointer-events-none rounded-tr-lg"></div>}
      {!isCompleted && <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-slate-200 pointer-events-none rounded-bl-lg"></div>}

      <div className="flex items-start p-4 gap-3 cursor-pointer" onClick={() => { if(showAiButton) setExpanded(!expanded) }}>
        {/* Tech Checkbox */}
        <div className="pt-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle(activity.id); }}
            className={`w-5 h-5 flex items-center justify-center transition-all border
              ${isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'bg-white border-slate-300 text-transparent hover:border-cyan-400'
              }`}
          >
            <Check size={12} strokeWidth={4} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
             <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 border border-slate-200">
                {activity.time}
             </span>
             <span className={`text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-wide font-mono ${getTypeColor()}`}>
                {activity.type}
            </span>
            {isMajor && !isCompleted && <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>}
          </div>
          
          <h3 className={`font-bold text-lg leading-tight mb-1 truncate font-sans tracking-tight ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {activity.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3 font-mono">
            {getIcon()}
            <span className="truncate">{activity.location}</span>
          </div>

          {activity.details && (
            <div className="text-xs text-slate-600 bg-slate-50 px-2 py-1.5 border-l-2 border-slate-300 mb-3 font-mono leading-relaxed">
              // {activity.details}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-colors uppercase tracking-wider font-mono"
            >
                <MapPin size={10} /> Google
            </a>
            
            <a 
                href={naverNavUrl} 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-xs font-bold text-[#03C75A] hover:bg-[#03C75A] hover:text-white hover:border-[#03C75A] transition-all uppercase tracking-wider font-mono"
            >
                <Navigation size={10} /> Naver
            </a>
            
            {showAiButton && (
            <button
                onClick={handleAiAnalysis}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border transition-all uppercase tracking-wider font-mono
                    ${expanded 
                        ? 'bg-slate-800 text-white border-slate-800' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
                    }
                `}
            >
                <Sparkles size={10} />
                {expanded ? '收起資訊' : '詳細資訊'}
            </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded AI Content */}
      {expanded && aiData && (
        <div className="border-t border-slate-200 bg-slate-50 p-4">
             <div className="space-y-4">
                
                <div className="grid grid-cols-[24px_1fr] gap-3">
                    <div className="mt-1 text-slate-400"><Info size={16} /></div>
                    <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono border-b border-slate-200 pb-1">歷史背景</h4>
                        <p className="text-sm text-slate-700 leading-relaxed font-sans">{aiData.history}</p>
                    </div>
                </div>

                <div className="grid grid-cols-[24px_1fr] gap-3">
                    <div className="mt-1 text-orange-400"><Utensils size={16} /></div>
                    <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono border-b border-slate-200 pb-1">美食情報</h4>
                        <div className="flex flex-wrap gap-2">
                            {aiData.mustEat.map((food, i) => (
                                <span key={i} className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-1 font-mono">
                                    [{food}]
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[24px_1fr] gap-3">
                    <div className="mt-1 text-cyan-500"><Terminal size={16} /></div>
                    <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono border-b border-slate-200 pb-1">實用貼士</h4>
                        <ul className="text-sm text-slate-700 space-y-2 list-none font-mono">
                            {aiData.tips.map((tip, i) => (
                                <li key={i} className="flex gap-2 items-start">
                                    <span className="text-cyan-500 mt-1">&gt;&gt;</span>
                                    <span className="flex-1">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-2">
                    <button onClick={() => setExpanded(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
                        <ChevronUp size={20} className="mx-auto" />
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};