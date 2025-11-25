import React, { useEffect, useState } from 'react';
import { CloudSnow, CloudSun, Sun, CloudRain, Cloud, Loader2, Thermometer, Activity } from 'lucide-react';
import { WeatherInfo } from '../types';

interface WeatherWidgetProps {
  lat?: number;
  lng?: number;
  locationName: string;
}

const getWeatherCondition = (code: number): 'Sunny' | 'Cloudy' | 'Rain' | 'Snow' => {
  if (code === 0 || code === 1) return 'Sunny';
  if (code === 2 || code === 3 || code === 45 || code === 48) return 'Cloudy';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code === 95) return 'Rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'Snow';
  return 'Cloudy';
};

const getWeatherDescription = (code: number): string => {
  const map: Record<number, string> = {
    0: '晴朗', 1: '大致晴朗', 2: '多雲', 3: '陰天',
    45: '起霧', 48: '霧',
    51: '毛毛雨', 53: '毛毛雨', 55: '毛毛雨',
    61: '小雨', 63: '中雨', 65: '大雨',
    71: '小雪', 73: '中雪', 75: '大雪',
    80: '陣雨', 81: '陣雨', 82: '陣雨',
    95: '雷雨'
  };
  return map[code] || '多雲';
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lng, locationName }) => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`
        );
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        const current = data.current;
        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: getWeatherCondition(current.weather_code),
          description: getWeatherDescription(current.weather_code)
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lng]);

  if (!lat || !lng) return null;

  return (
    <div className="flex items-center gap-3 bg-white border border-slate-300 px-3 py-1.5 min-w-[130px] justify-between transition-all shadow-sm">
      <div className="flex items-center gap-2">
        {loading ? (
          <Activity size={14} className="animate-spin text-cyan-500" />
        ) : error ? (
          <Thermometer size={14} className="text-slate-400" />
        ) : (
          <>
            {weather?.condition === 'Snow' && <CloudSnow size={14} className="text-cyan-400" />}
            {weather?.condition === 'Rain' && <CloudRain size={14} className="text-blue-500" />}
            {weather?.condition === 'Cloudy' && <Cloud size={14} className="text-slate-400" />}
            {weather?.condition === 'Sunny' && <Sun size={14} className="text-amber-500" />}
          </>
        )}
        <span className="font-bold text-slate-700 tracking-tight text-xs uppercase font-mono">{locationName.split(' ')[0].slice(0, 6)}</span>
      </div>

      <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
        {loading ? (
          <span className="text-[10px] text-slate-400 font-mono">SCAN...</span>
        ) : error ? (
           <span className="text-[10px] text-slate-400 font-mono">ERR</span>
        ) : (
          <>
            <span className="font-bold text-slate-900 font-mono text-sm">{weather?.temp}°</span>
            <span className="text-[9px] text-slate-400 hidden sm:inline font-mono uppercase">{weather?.description}</span>
          </>
        )}
      </div>
    </div>
  );
};