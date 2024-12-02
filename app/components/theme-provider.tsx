'use client'

import { useState, useEffect } from 'react'

function getThemeClass() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 7) return 'theme-dawn';
    if (hour >= 7 && hour < 10) return 'theme-morning';
    if (hour >= 10 && hour < 14) return 'theme-noon';
    if (hour >= 14 && hour < 17) return 'theme-afternoon';
    if (hour >= 17 && hour < 19) return 'theme-evening';
    if (hour >= 19 && hour < 21) return 'theme-dusk';
    if (hour >= 21 && hour < 24) return 'theme-night';
    if (hour >= 24 || hour < 5) return 'theme-midnight';
    return 'theme-night';
}

function getGradientPosition() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    return Math.max(0, Math.min(100, ((hours - 6) / 12) * 100));
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [position, setPosition] = useState(50);
    const [themeClass, setThemeClass] = useState('theme-night');

    useEffect(() => {
        const updateTheme = () => {
            setPosition(getGradientPosition());
            setThemeClass(getThemeClass());
        };

        updateTheme();
        const interval = setInterval(updateTheme, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`
            ${themeClass} 
            grid grid-rows-[20px_1fr_20px] 
            items-center justify-items-center 
            min-h-screen p-8 
            font-[family-name:var(--font-geist-sans)]
            `}
            style={{
                background: `radial-gradient(circle at ${position}% ${Math.abs(position - 50) * 2}%, var(--gradient-start), var(--gradient-end))`
            }}>
            {children}
        </div>
    );
}