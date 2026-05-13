// ============================================
// Distance Calculation & Formatting Utilities
// ============================================

import { Coordinates } from '../types';

/**
 * Haversine formula to calculate distance between two coordinates
 * Returns distance in meters
 */
export const haversineDistance = (a: Coordinates, b: Coordinates): number => {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  const distance = R * c;

  return distance;
};

export const toRad = (deg: number): number => {
  return (deg * Math.PI) / 180;
};

/**
 * Format distance in human-readable format
 * Returns "350m" for short distances, "1.2km" for longer
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }

  const km = (meters / 1000).toFixed(1);
  return `${km}km`;
};

export const calculateDistanceMultiple = (
  userLocation: Coordinates,
  destinations: Coordinates[]
): number[] => {
  return destinations.map((dest) => haversineDistance(userLocation, dest));
};

export const filterByDistance = (
  userLocation: Coordinates,
  destinations: Array<{ location: Coordinates; [key: string]: any }>,
  maxDistance: number
): typeof destinations => {
  return destinations.filter((item) => {
    const distance = haversineDistance(userLocation, item.location);
    return distance <= maxDistance;
  });
};
