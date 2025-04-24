import { Droplets, InfoIcon, Wind } from "lucide-react";
import { WeatherInfoProps } from "../../types";
import { getFormatedTemperature, getWeatherIcon } from "./utils";

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherInfo }) => {
  const weatherIcon = getWeatherIcon(weatherInfo.weather[0].icon);
  return (
    <div className="space-y-2">
      <h3 className="text-xl text-black">
        {weatherInfo.name}, {weatherInfo.sys.country}
      </h3>
      <h4 className="text-black pt-4">How's it looking outside:</h4>
      <div className="flex items-center">
        <img src={weatherIcon} alt="Weather Icon" />
        <span className="text-3xl text-indigo-900">
          {getFormatedTemperature(weatherInfo.main.temp)} °C
        </span>
      </div>
      <p className="text-sm">
        Feels like: {getFormatedTemperature(weatherInfo.main.feels_like)} °C
      </p>
      <p className="text-gray-500 flex pt-4">
        <span className="font-bold mr-1">Humidity:</span>{" "}
        {weatherInfo.main.humidity} % <Droplets className="ml-2" />
      </p>
      <p className="text-gray-500 flex pt-4">
        <span className="font-bold mr-1">Wind:</span> {weatherInfo.wind.speed}{" "}
        km/h <Wind className="ml-2" />
      </p>
      <p className="text-gray-500 pt-4">
        <span className="font-bold mr-1">Condition:</span>{" "}
        {weatherInfo.weather[0].description}
      </p>
      <div className="flex items-center text-xs text-gray-400 pt-4">
        <InfoIcon size={14} className="mr-1" />
        <span>
          <span className="font-bold mr-1">Last updated:</span>{" "}
          {new Date(weatherInfo.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default WeatherInfo;
