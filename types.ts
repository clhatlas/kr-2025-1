
export type ActivityType = 'sightseeing' | 'food' | 'transport' | 'stay' | 'flight';

export interface AIData {
  tips: string[];
  mustEat: string[];
  history: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  type: ActivityType;
  details?: string;
  lat?: number;
  lng?: number;
  aiData?: AIData;
}

export interface DayItinerary {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

export interface WeatherInfo {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Snow' | 'Rain';
  description: string;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipProb: number;
}
