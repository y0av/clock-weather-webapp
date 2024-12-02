'use client';

import Clock from "./components/clock";
import WeatherWithLocation from "./components/weather/weather-with-location";
import ThemeProvider from "./components/theme-provider";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="row-start-2 flex flex-col items-center space-y-8">
        <div className="h-[148px] flex items-center">
          <Clock />
        </div>
        <div className="h-[184px] min-w-[350px] flex items-center">
          <WeatherWithLocation />
        </div>
      </div>
    </ThemeProvider>
  );
}