'use client';
import { WeatherData, HourlyData } from "../../api/weather/types";
import Image from 'next/image';

interface WeatherWidgetProps {
    weatherData: WeatherData;
    hourlyData: HourlyData[];
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weatherData, hourlyData }) => {

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

            <div className="mt-4 border-t border-white/20 pt-4 opacity-50">
                <div className="grid grid-cols-5 gap-2">
                    {hourlyData.slice(0, 5).map((hour) => (
                        <div key={hour.dt} className="text-center">
                            <p className="text-xs font-medium">
                                {new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    hour12: false
                                }).replace(/^0/, '')}:00
                            </p>
                            <div className="flex items-center justify-center">
                                <p className="text-sm font-bold">{Math.round(hour.main.temp)}°</p>
                                <Image
                                    src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                    alt={hour.weather[0].description}
                                    width={20}
                                    height={20}
                                    className="inline-block"
                                />
                            </div>
                            {/* <p className="text-xs capitalize">{hour.weather[0].description}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;