'use client'

import { useState, useEffect, ReactElement } from 'react'

export const dynamic = "force-dynamic";

export default function LocationProvider({ children }: { children: ReactElement }) {
    const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        if ("geolocation" in navigator) {
            console.log("Requesting geolocation...")
            const geoWatcher = navigator.geolocation.watchPosition(
                (position) => {
                    console.log("Got position:", position.coords)
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                },
                (error) => {
                    console.error("Geolocation error:", error)
                    setError(`Unable to get location: ${error.message}`)
                },
                options
            )

            // Cleanup watcher on unmount
            return () => navigator.geolocation.clearWatch(geoWatcher)
        } else {
            setError('Geolocation not supported')
        }
    }, []) // Empty dependency array means run once on mount

    if (error) return <div className="text-center text-red-500">{error}</div>
    if (!coords) return <div className="text-center">Loading location...</div>

    return children
}