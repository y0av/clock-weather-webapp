'use client'
import Weather from './weather';
import { WeatherData, HourlyData } from '@/app/api/weather/types';
import { useState, useEffect } from 'react';

export const revalidate = 60;

const WeatherWithLocation = () => {
    const [weather, setWeather] = useState<WeatherData>();
    const [hourlyWeather, setHourlyWeather] = useState<HourlyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const fetchApiData = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        try {
            setLoading(true);

            // Fetch current weather
            const currentWeatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`,
                { next: { revalidate: 5 } }
            );

            // Fetch hourly forecast using OneCall API
            const hourlyWeatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`,
                { next: { revalidate: 5 } }
            );

            if (!currentWeatherRes.ok || !hourlyWeatherRes.ok)
                throw new Error('Failed to fetch data');

            const currentData = await currentWeatherRes.json();
            // When processing the response, the data structure will be different
            // The 3-hour forecast comes in response.list array
            const hourlyData = await hourlyWeatherRes.json();



            setWeather(currentData);
            setHourlyWeather(hourlyData.list); // list contains forecasts every 3 hours

            // Log hourly forecast
            console.log('Hourly weather forecast:', hourlyData.list);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    setLocation({
                        latitude: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LATITUDE || '0'),
                        longitude: parseFloat(process.env.NEXT_PUBLIC_DEFAULT_LONGITUDE || '0')
                    });
                    console.log(`Geolocation error: ${error.message}`);
                    //setError(`Geolocation error: ${error.message}`);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (location) {
            fetchApiData(location);
        }
    }, [location]);

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div className="flex justify-center items-center h-full w-full"><div className="lds-dual-ring opacity-5"></div></div>;

    return weather ? <Weather weatherData={weather} hourlyData={hourlyWeather} /> : <div></div>;
}

export default WeatherWithLocation;