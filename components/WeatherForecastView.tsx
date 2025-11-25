import React, { useEffect, useState } from 'react';
import { CloudSnow, CloudSun, Sun, CloudRain, Cloud, Loader2, MapPin, CalendarDays, Droplets, Wind } from 'lucide-react';
import { ITINERARY_DATA } from '../constants';
import { DailyForecast } from '../types';

// Map WMO codes to Icons and Labels (Shared logic with Widget, but expanded for daily)
const getWeatherIcon = (code: number, size = 24) => {
    if (code === 0 || code === 1) return <Sun size={size} className="text-amber-500" />;
    if (code === 2 || code === 3 || code === 45 || code === 48) return <CloudSun size={size} className="text-gray-400" />;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code === 95) return <CloudRain size={size} className="text-blue-500" />;
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <CloudSnow size={size} className="text-sky-300" />;
    return <Cloud size={size} className="text-gray-400" />;
};

const getWeatherDescription = (code: number): string => {
    const map: Record<number, string> = {
      0: '晴朗無雲', 1: '大致晴朗', 2: '局部多雲', 3: '陰天',
      45: '起霧', 48: '霧氣',
      51: '微雨', 53: '毛毛雨', 55: '細雨',
      61: '小雨', 63: '中雨', 65: '豪雨',
      71: '小雪', 73: '中雪', 75: '大雪',
      80: '陣雨', 81: '強陣雨', 82: '暴雨',
      95: '雷雨'
    };
    return map[code] || '多雲';
};

export const WeatherForecastView: React.FC = () => {
  const [forecasts, setForecasts] = useState<Record<number, DailyForecast>>({});
  const [loading, setLoading] = useState(true);

  // Identify primary location for each day
  // Priority: Sightseeing > Stay > Transport
  const dayLocations = ITINERARY_DATA.map(day => {
    const mainActivity = 
        day.activities.find(a => a.type === 'sightseeing' && a.lat) ||
        day.activities.find(a => a.type === 'stay' && a.lat) ||
        day.activities.find(a => a.lat); // Fallback
    
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
        // Fetch data for each day in parallel
        // Since we can't get Dec 2025 weather yet, we fetch the current 7-day forecast
        // and map Day 1 of the trip to Today, Day 2 to Tomorrow, etc.
        // This provides a realistic "Forecast Demo".
        const promises = dayLocations.map(async (loc, index) => {
            if (!loc.lat || !loc.lng) return;

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.daily) {
                // Use index to get the corresponding day from the forecast (Day 1 -> Today, Day 2 -> Tomorrow...)
                const i = index; 
                newForecasts[loc.day] = {
                    date: loc.date, // Keep the Trip Date string
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
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <CloudSun className="text-korea-blue" />
                    旅程天氣預報
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    根據行程地點顯示即時天氣 (模擬 12/17-21)
                </p>
            </div>
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <span className="text-sm">正在分析氣象資料...</span>
            </div>
        ) : (
            <div className="space-y-3">
                {dayLocations.map((loc) => {
                    const forecast = forecasts[loc.day];
                    if (!forecast) return null;

                    return (
                        <div key={loc.day} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                            
                            {/* Date & Location */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-blue-50 text-korea-blue text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Day {loc.day}</span>
                                    <span className="text-xs font-medium text-slate-400">{forecast.date.split(' ')[0]}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                                    <MapPin size={16} className="text-slate-400" />
                                    {loc.locationName}
                                </div>
                            </div>

                            {/* Weather Icon & Desc */}
                            <div className="flex flex-col items-center px-4 border-l border-slate-100 border-r mx-2 w-24 text-center">
                                <div className="mb-1">{getWeatherIcon(forecast.weatherCode, 28)}</div>
                                <span className="text-xs font-medium text-slate-600">
                                    {getWeatherDescription(forecast.weatherCode)}
                                </span>
                            </div>

                            {/* Temps */}
                            <div className="text-right min-w-[60px]">
                                <div className="text-lg font-bold text-slate-800 leading-none mb-1">
                                    {forecast.maxTemp}°
                                </div>
                                <div className="text-sm font-medium text-slate-400 leading-none">
                                    {forecast.minTemp}°
                                </div>
                                {forecast.precipProb > 0 && (
                                    <div className="flex items-center justify-end gap-0.5 text-[10px] text-blue-500 mt-1.5 font-bold">
                                        <Droplets size={10} />
                                        {forecast.precipProb}%
                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}

                <div className="mt-6 bg-slate-100 p-3 rounded-xl text-center">
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                        ⚠️ 注意：由於 2025 年 12 月距離現在過遠，以上顯示的為該地點「未來 5 天」的真實預報，僅供測試與參考介面使用。出發前請再次確認最新氣象。
                    </p>
                </div>
            </div>
        )}
    </div>
  );
};
