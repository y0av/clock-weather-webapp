'use client';
import { WeatherData } from "../../api/weather/types";
import Image from 'next/image';

interface WeatherWidgetProps {
    weatherData: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weatherData }) => {

    return (
        <div className="bg-gradient-to-r from-[var(--weather-card-gradient-start)] to-[var(--weather-card-gradient-end)] rounded-xl p-6 text-[var(--foreground)] w-[350px] shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-xl font-semibold mb-1">{weatherData.name}</h1>
                    <h2 className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</h2>
                    <p className="text-sm opacity-90">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
                </div>
                <Image
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    width={80}
                    height={80}
                    className="w-20 h-20"
                />
            </div>

            <p className="text-lg capitalize ">{weatherData.weather[0].description}</p>

            {/*  <div className="grid grid-cols-2 space-y-4">
                <div className="space-y-2">
                    <p>High: {Math.round(weatherData.main.temp_max)}°C</p>
                    <p>Low: {Math.round(weatherData.main.temp_min)}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className="space-y-2">
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                </div>
            </div> */}
        </div>
    );
};

export default WeatherWidget;