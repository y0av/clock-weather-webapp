'use client';
import { useEffect, useState } from 'react';
import Clock from "./components/clock";
import WeatherWithLocation from "./components/weather/weather-with-location";

export const dynamic = "force-dynamic";

function getGradientPosition() {
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;
  return Math.max(0, Math.min(100, ((hours - 6) / 12) * 100));
  //return now.getSeconds() / 60 * 100;
}

function getThemeClass() {
  const hour = new Date().getHours();

  if (hour >= 3 && hour < 5) return 'theme-dawn';
  if (hour >= 5 && hour < 8) return 'theme-morning';
  if (hour >= 8 && hour < 12) return 'theme-noon';
  if (hour >= 12 && hour < 15) return 'theme-afternoon';
  if (hour >= 15 && hour < 17) return 'theme-evening';
  if (hour >= 17 && hour < 19) return 'theme-dusk';
  if (hour >= 19 && hour < 22) return 'theme-night';
  if (hour >= 22 || hour < 3) return 'theme-midnight';
  return 'theme-night';
}

export default function Home() {
  const [position, setPosition] = useState(50);
  const themeClass = getThemeClass();

  useEffect(() => {
    const updatePosition = () => {
      setPosition(getGradientPosition());
    };

    updatePosition();
    const interval = setInterval(updatePosition, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`
      ${themeClass} 
      grid grid-rows-[20px_1fr_20px] 
      items-center justify-items-center 
      min-h-screen p-8 
      font-[family-name:var(--font-geist-sans)]
      `}
      style={{
        background: `radial-gradient(circle at ${position}% ${Math.abs(position - 50) * 2}%, var(--gradient-start), var(--gradient-end))`
      }}
    >
      <div className="row-start-2 flex flex-col items-center space-y-8">
        <div className="h-[148px] flex items-center">
          <Clock />
        </div>
        <div className="h-[184px] min-w-[350px] flex items-center">
          <WeatherWithLocation />
        </div>
      </div>
    </main>
  );
}