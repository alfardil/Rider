import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { FAKE_DATA } from "../data/fakeData";

const Home: React.FC = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // request location permission
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

  if (locationError) {
    console.log("Error");
    Alert.alert("Location Error", locationError);
  }

  return (
    <View className="flex-1 bg-black pt-12 px-5">
      {/* Title */}
      <Text className="text-white text-2xl font-bold self-center mb-3">
        SafTA
      </Text>

      {/* Map */}
      {region ? (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton
        >
          {FAKE_DATA.map((problem) => (
            <Marker
              key={problem.id}
              coordinate={problem.location}
              pinColor={problem.verified ? "red" : "yellow"}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </MapView>
      ) : (
        <Text className="text-white text-lg text-center mt-12">
          Fetching your location...
        </Text>
      )}

      {/* Search Bar */}
      <View className="flex-row bg-white rounded-full px-4 items-center mb-3">
        <TextInput
          placeholder="Search places here"
          placeholderTextColor="#888"
          className="flex-1 h-10 text-black text-base"
        />
        <FontAwesome name="search" size={24} color="black" />
      </View>

      {/* Create Alert Button */}
      <TouchableOpacity
        className="bg-white p-4 rounded-full items-center mb-24"
        onPress={() => Alert.alert("Feature Coming Soon", "Create an alert!")}
      >
        <Text className="text-red-500 font-bold text-base">
          CREATE AN ALERT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
