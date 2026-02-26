"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook to handle browser geolocation
 * @returns {object} Geolocation state and getter function
 */
export default function useGeolocation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    const getCoordinates = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!typeof window !== "undefined" || !navigator.geolocation) {
                const err = "Geolocation is not supported by your browser";
                setError(err);
                return reject(err);
            }

            setLoading(true);
            setError(null);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setCoordinates(coords);
                    setLoading(false);
                    resolve(coords);
                },
                (err) => {
                    let message = "Failed to get location";
                    if (err.code === 1) message = "Permission denied. Please allow location access.";
                    else if (err.code === 2) message = "Location unavailable.";
                    else if (err.code === 3) message = "Request timed out.";

                    setError(message);
                    setLoading(false);
                    reject(message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        });
    }, []);

    return { loading, error, coordinates, getCoordinates, setCoordinates };
}
