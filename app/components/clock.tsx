'use client';

import { useEffect, useState } from 'react';

const timeConfig = {
    updateInterval: 1000
};

export default function Clock() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }));
            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, timeConfig.updateInterval);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-8xl font-bold tracking-tight">{currentTime}</h1>
            <p className="text-xl text-gray-400">{currentDate}</p>
        </div>
    );
}