// page.tsx
import Clock from "./components/clock";
import WeatherWithLocation from "./components/weather/weather-with-location";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[radial-gradient(var(--gradient-start),var(--gradient-end))]">
      <div className="row-start-2 flex flex-col items-center gap-8">
        <div className="h-[148px] flex items-center">
          <Clock />
        </div>
        <div className="h-[288px] min-w-[350px] flex items-center">
          <WeatherWithLocation />
        </div>
      </div>
    </main>
  );
}