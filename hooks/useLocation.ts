import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const useLocation = (): {
  region: Region | null;
  locationError: string | null;
} => {
  const [region, setRegion] = useState<Region | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          setLocationError("Permission to access location was denied");
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.log("Error fetching location. Please try again.");
        setLocationError("Error fetching location. Please try again.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (locationError) {
      Alert.alert("Location Error", locationError);
    }
  }, [locationError]);

  return { region, locationError };
};