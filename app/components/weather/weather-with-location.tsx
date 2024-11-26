// components/weather/weather-with-location.tsx
import Weather from './weather';

export default async function WeatherWithLocation({ lat, lon }: { lat: number, lon: number }) {
    try {
        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
            { next: { revalidate: 5 } }
        );
        const weather = await data.json();
        //console.log(weather);
        return <Weather weatherData={weather} />;
    } catch {
        return <p>Error loading weather data</p>;
    }
}