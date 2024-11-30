// page.tsx
import Clock from "./components/clock";
import WeatherWithLocation from "./components/weather/weather-with-location";

export const dynamic = "force-dynamic";

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
  const themeClass = getThemeClass();

  return (
    <main className={`${themeClass} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] bg-[radial-gradient(var(--gradient-start),var(--gradient-end))]`}>
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