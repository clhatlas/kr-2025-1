import React, { useEffect, useState } from 'react';
import { CloudSnow, CloudSun, Sun, CloudRain, Cloud, Loader2, MapPin, Droplets, Wind } from 'lucide-react';
import { ITINERARY_DATA } from '../constants';
import { DailyForecast } from '../types';

const getWeatherIcon = (code: number, size = 24) => {
    if (code === 0 || code === 1) return <Sun size={size} className="text-amber-500" />;
    if (code === 2 || code === 3 || code === 45 || code === 48) return <CloudSun size={size} className="text-slate-500" />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code === 95) return <CloudRain size={size} className="text-blue-500" />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={size} className="text-cyan-400" />;
    return <Cloud size={size} className="text-slate-400" />;
};

const getWeatherDescription = (code: number): string => {
    const map: Record<number, string> = {
      0: 'CLEAR', 1: 'MOSTLY CLEAR', 2: 'PARTLY CLOUDY', 3: 'OVERCAST',
      45: 'FOG', 48: 'DEPOSITING RIME FOG',
      51: 'LIGHT DRIZZLE', 53: 'DRIZZLE', 55: 'HEAVY DRIZZLE',
      61: 'SLIGHT RAIN', 63: 'RAIN', 65: 'HEAVY RAIN',
      71: 'SLIGHT SNOW', 73: 'SNOW', 75: 'HEAVY SNOW',
      80: 'SHOWERS', 81: 'HEAVY SHOWERS', 82: 'VIOLENT SHOWERS',
      95: 'THUNDERSTORM'
    };
    return map[code] || 'CLOUDY';
};

export const WeatherForecastView: React.FC = () => {
  const [forecasts, setForecasts] = useState<Record<number, DailyForecast>>({});
  const [loading, setLoading] = useState(true);

  const dayLocations = ITINERARY_DATA.map(day => {
    const mainActivity = 
        day.activities.find(a => a.type === 'sightseeing' && a.lat) ||
        day.activities.find(a => a.type === 'stay' && a.lat) ||
        day.activities.find(a => a.lat);
    return {
        day: day.day,
        date: day.date,
        locationName: mainActivity?.location.split(' ')[0] || 'Unknown',
        lat: mainActivity?.lat,
        lng: mainActivity?.lng
    };
  });

  useEffect(() => {
    const fetchAllForecasts = async () => {
      setLoading(true);
      const newForecasts: Record<number, DailyForecast> = {};
      try {
        const promises = dayLocations.map(async (loc, index) => {
            if (!loc.lat || !loc.lng) return;
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.daily) {
                const i = index; 
                newForecasts[loc.day] = {
                    date: loc.date,
                    maxTemp: Math.round(data.daily.temperature_2m_max[i]),
                    minTemp: Math.round(data.daily.temperature_2m_min[i]),
                    weatherCode: data.daily.weathercode[i],
                    precipProb: data.daily.precipitation_probability_max?.[i] || 0
                };
            }
        });
        await Promise.all(promises);
        setForecasts(newForecasts);
      } catch (error) {
        console.error("Failed to fetch weather forecasts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllForecasts();
  }, []);

  return (
    <div className="p-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
                    <Wind className="text-cyan-600" size={20} />
                    Atmospheric Data
                </h2>
                <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest">
                    Predictive Model // Dec 17-21
                </p>
            </div>
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="animate-spin mb-3 text-cyan-600" size={32} />
                <span className="text-xs font-mono tracking-widest uppercase">Initializing Sensors...</span>
            </div>
        ) : (
            <div className="space-y-3">
                {dayLocations.map((loc) => {
                    const forecast = forecasts[loc.day];
                    if (!forecast) return null;

                    return (
                        <div key={loc.day} className="bg-white border border-slate-300 p-0 flex items-stretch hover:border-cyan-400 transition-all shadow-sm group">
                            
                            <div className="bg-slate-50 border-r border-slate-200 px-3 py-3 flex flex-col items-center justify-center min-w-[60px]">
                                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Day</span>
                                <span className="text-xl font-black text-slate-800 font-mono">{loc.day}</span>
                            </div>

                            <div className="flex-1 p-3 flex flex-col justify-center">
                                <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase tracking-tight text-sm">
                                    <MapPin size={12} className="text-slate-400" />
                                    {loc.locationName}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                                    {forecast.date.split(' ')[0]}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center px-2 w-20 border-l border-dashed border-slate-200">
                                <div className="mb-1">{getWeatherIcon(forecast.weatherCode, 20)}</div>
                                <span className="text-[8px] font-bold text-slate-500 uppercase font-mono tracking-tighter text-center leading-none">
                                    {getWeatherDescription(forecast.weatherCode)}
                                </span>
                            </div>

                            <div className="w-20 bg-slate-900 text-white flex flex-col items-center justify-center p-2">
                                <div className="text-lg font-bold font-mono leading-none">
                                    {forecast.maxTemp}°
                                </div>
                                <div className="text-xs font-mono text-slate-400 leading-none mt-1">
                                    {forecast.minTemp}°
                                </div>
                                {forecast.precipProb > 0 && (
                                    <div className="flex items-center gap-0.5 text-[9px] text-cyan-400 mt-1 font-bold">
                                        <Droplets size={8} />
                                        {forecast.precipProb}%
                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}

                <div className="mt-6 border-t border-slate-200 pt-4 text-center">
                    <p className="text-[9px] text-slate-400 leading-relaxed font-mono uppercase tracking-wider">
                        // CAUTION: Weather patterns are subject to change based on real-time atmospheric conditions.
                    </p>
                </div>
            </div>
        )}
    </div>
  );
};