import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import Spinner from "../Spinner";
import WeatherInfo from "../WeatherInfo";
import { getBackgroundClass } from "./utils";
import { CacheItem, WeatherData } from "../../types";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("Amsterdam");
  const [debouncedCity] = useDebounce(city, 500);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  console.log("weather : ", weather);

  // Use useRef to maintain a cache that persists across renders but doesn't trigger re-renders
  const weatherCache = useRef<Record<string, CacheItem>>({});

  // Cache expiration time (15 minutes = 900,000 milliseconds)
  const CACHE_EXPIRATION = 15 * 60 * 1000;

  useEffect(() => {
    const fetchWeather = async () => {
      setErrorMessage("");
      if (!debouncedCity.trim()) {
        setWeather(null);
        return;
      }

      const normalizedCity = debouncedCity.toLowerCase().trim();
      const currentTime = Date.now();

      // Check if we have a valid cached result
      const cachedResult = weatherCache.current[normalizedCity];
      if (
        cachedResult &&
        currentTime - cachedResult.timestamp < CACHE_EXPIRATION
      ) {
        console.log("Using cached weather data for", normalizedCity);
        setWeather(cachedResult.data);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: debouncedCity,
              appid: "e9b905d8abdd690838969eef07d3ad41",
              units: "metric",
            },
          }
        );

        // Append timestamp to the weather data
        const weatherData: WeatherData = {
          ...response.data,
          timestamp: currentTime,
        };

        // Update the cache
        weatherCache.current[normalizedCity] = {
          data: weatherData,
          timestamp: currentTime,
        };

        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
        setErrorMessage("Please check if the city name is typed correctly.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const clearSearch = () => {
    setErrorMessage("");
    setCity("");
    setWeather(null);
  };

  // Default background when no weather data or empty input
  const backgroundClass =
    weather && debouncedCity.trim()
      ? getBackgroundClass(weather.weather[0].main)
      : "bg-gray-200";

  const renderWeatherContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      );
    }

    if (debouncedCity.trim() && weather) {
      return <WeatherInfo weatherInfo={weather} />;
    }

    return (
      <p className="text-gray-500">Enter a city to view weather information</p>
    );
  };

  return (
    <section className={`w-full min-h-screen flex flex-col ${backgroundClass}`}>
      <div className="mt-20 flex items-center justify-center">
        <div className="p-4 w-full max-w-4xl bg-white rounded-xl shadow-md space-y-2 sm:space-y-4 mx-4 sm:mx-8">
          <div className="flex align-center justify-center mb-2">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              className="border border-gray-300 p-2 w-full rounded mr-1"
              placeholder="Type city (Ex: Amsterdam)"
            />
            {city && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}
          </div>
          {renderWeatherContent()}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
