'use client'
import { useState, useEffect } from "react";

// Time display configuration
const timeConfig = {
  //format: 'HH:mm', // 24-hour format with seconds
  updateInterval: 1000 // update every second
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }));
      setCurrentDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, timeConfig.updateInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[radial-gradient(var(--gradient-start),var(--gradient-end))]">
      <main className="flex flex-col gap-4 row-start-2 items-center">
        <h1 className="text-8xl font-bold tracking-tight">{currentTime}</h1>
        <p className="text-xl text-gray-400">{currentDate}</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div></div>
      </footer>
    </div>
  );
}
