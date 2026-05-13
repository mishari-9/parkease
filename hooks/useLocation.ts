// ============================================
// useLocation Hook
// ============================================

import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Coordinates } from '../types';
import { AppConfig } from '../constants/config';

interface UseLocationReturn {
  userLocation: Coordinates | null;
  permissionStatus: string | null;
  requestPermission: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLocation = (): UseLocationReturn => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } else {
        setError('Location permission denied');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestPermission();

    // Watch position every 5 seconds
    const watchSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: AppConfig.LOCATION_WATCH_INTERVAL,
        distanceInterval: 10, // 10 meters
      },
      (location) => {
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    );

    return () => {
      watchSubscription.then((sub) => sub.remove());
    };
  }, []);

  return {
    userLocation,
    permissionStatus,
    requestPermission,
    isLoading,
    error,
  };
};
