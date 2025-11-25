import React, { useState } from 'react';
import { MapPin, Navigation, Utensils, Info, Check, Car, Bed, Plane, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isCompleted, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const aiData = activity.aiData;

  const getIcon = () => {
    switch (activity.type) {
      case 'food': return <Utensils size={18} className="text-orange-500" />;
      case 'transport': return <Car size={18} className="text-blue-500" />;
      case 'stay': return <Bed size={18} className="text-indigo-500" />;
      case 'flight': return <Plane size={18} className="text-sky-500" />;
      default: return <MapPin size={18} className="text-emerald-500" />;
    }
  };

  const getTypeLabel = () => {
     switch (activity.type) {
      case 'food': return '美食';
      case 'transport': return '交通';
      case 'stay': return '住宿';
      case 'flight': return '航班';
      default: return '景點';
    }
  };

  const handleAiAnalysis = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`;
  
  // Naver Map App URL Scheme
  // Docs: https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme
  const getNaverNavUrl = () => {
    const appName = 'KoreaTrip2025';
    if (activity.lat && activity.lng) {
        // route/car: Driving directions from current location to destination
        return `nmap://route/car?dlat=${activity.lat}&dlng=${activity.lng}&dname=${encodeURIComponent(activity.title)}&appname=${appName}`;
    } else {
        // Fallback to search if coordinates are missing
        return `nmap://search?query=${encodeURIComponent(activity.location)}&appname=${appName}`;
    }
  };

  const navUrl = getNaverNavUrl();

  // Only show button if we actually have hard-coded data
  const showAiButton = !!aiData;

  return (
    <div className={`relative flex flex-col bg-white rounded-2xl shadow-sm border mb-4 transition-all duration-300 ${isCompleted ? 'border-slate-200 bg-slate-50 opacity-70' : 'border-slate-100'}`}>
      
      {/* Main Card Content */}
      <div className="flex items-start p-4 gap-3 cursor-pointer" onClick={() => { if(showAiButton) setExpanded(!expanded) }}>
        {/* Checkbox Area */}
        <div className="pt-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggle(activity.id); }}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-green-400'}`}
          >
            <Check size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Info Area */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-slate-400 bg-slate-100 px-1.5 rounded">{activity.time}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide
                    ${activity.type === 'food' ? 'text-orange-600 border-orange-200 bg-orange-50' : ''}
                    ${activity.type === 'transport' ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}
                    ${activity.type === 'sightseeing' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''}
                    ${activity.type === 'stay' ? 'text-indigo-600 border-indigo-200 bg-indigo-50' : ''}
                    ${activity.type === 'flight' ? 'text-sky-600 border-sky-200 bg-sky-50' : ''}
                `}>
                    {getTypeLabel()}
                </span>
            </div>
          </div>
          
          <h3 className={`font-bold text-lg text-slate-800 leading-tight mb-1 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
            {activity.title}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
            {getIcon()}
            <span>{activity.location}</span>
          </div>

          {activity.details && (
            <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 inline-block mb-2">
              {activity.details}
            </p>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <a 
                href={mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm"
            >
                <MapPin size={14} /> 地圖
            </a>
            
            <a 
                href={navUrl} 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#03C75A] border border-[#03C75A] rounded-lg text-xs font-semibold text-white hover:bg-[#02b350] shadow-sm shadow-green-100"
            >
                <Navigation size={14} /> Naver 導航
            </a>
            
            {showAiButton && (
            <button
                onClick={handleAiAnalysis}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border transition-all
                    ${expanded ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-600'}
                `}
            >
                <Sparkles size={14} />
                {expanded ? '收起攻略' : '導遊攻略'}
            </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded AI Content */}
      {expanded && aiData && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-200">
             <div className="space-y-4">
                
                {/* History */}
                <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5 text-purple-500"><Info size={16} /></div>
                    <div>
                        <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">關於這裡</h4>
                        <p className="text-sm text-slate-700 leading-relaxed">{aiData.history}</p>
                    </div>
                </div>

                {/* Must Eat */}
                <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5 text-orange-500"><Utensils size={16} /></div>
                    <div>
                        <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-1">必吃美食</h4>
                        <div className="flex flex-wrap gap-2">
                            {aiData.mustEat.map((food, i) => (
                                <span key={i} className="text-xs bg-white border border