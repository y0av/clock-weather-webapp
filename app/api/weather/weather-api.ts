import { WeatherData } from "./types";


export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
};