export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    description: string;
    main: string;
    icon: string;
  }[];
  timestamp: number;
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

export interface CacheItem {
  data: WeatherData;
  timestamp: number;
}

export interface WeatherInfoProps {
  weatherInfo: WeatherData;
}