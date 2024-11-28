'use client'
import { WeatherData } from '@/app/api/weather/types';
import { useEffect, useState } from 'react'
import Weather from './weather';

export const revalidate = 60

const WeatherWithLocation = () => {
    const [weather, setWeather] = useState<WeatherData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const fetchApiData = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`,
                { next: { revalidate: 5 } }
            );
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setWeather(data);
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
    if (loading) return <div>Loading...</div>;

    return weather ? <Weather weatherData={weather} /> : <div></div>;
}

export default WeatherWithLocation;