// page.tsx
import Clock from "./components/clock";
import LocationProvider from "./components/weather/location-provider";

export const dynamic = "force-dynamic";

// Move WeatherWithLocation to its own component file
import WeatherWithLocation from "./components/weather/weather-with-location";

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[radial-gradient(var(--gradient-start),var(--gradient-end))]">
      <div className="row-start-2 flex flex-col gap-8">
        <Clock />
        <LocationProvider>
          <WeatherWithLocation />
        </LocationProvider>
      </div>
    </main>
  );
}