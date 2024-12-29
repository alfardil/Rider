import { useFakeDataStore } from "@/app/data/hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import MapMarker from "@/components/MapMarker";
import CreateAlertScreen from "@/components/CreateAlertScreen";
import { useLocation } from "@/hooks/useLocation";

const { height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 80;

const Home: React.FC = () => {
  const router = useRouter();
  const { region } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const problems = useFakeDataStore((state) => state.problems);

  const { lat, lng } = useLocalSearchParams<{
    lat?: string;
    lng?: string;
  }>();

  // decide which region to use (params vs. user location)
  const regionToUse = useMemo(() => {
    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);

      return {
        latitude: parsedLat,
        longitude: parsedLng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    } else if (region) {
      return region;
    } else {
      return null;
    }
  }, [lat, lng, region]);

  return (
    <View className="flex-1 bg-black">
      {/* Map */}
      {regionToUse ? (
        <MapView
          style={[styles.map, { height: height - TAB_BAR_HEIGHT }]}
          initialRegion={regionToUse}
          showsUserLocation
          showsMyLocationButton
        >
          {problems.map((problem) => (
            <MapMarker key={problem.id} problem={problem} />
          ))}
        </MapView>
      ) : (
        <Text className="text-white text-lg text-center mt-12">
          Fetching your location...
        </Text>
      )}

      {/* Search Bar */}
      <View className="absolute bottom-32 left-5 right-5 flex-row bg-white rounded-full px-4 items-center">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          className="flex-1 h-10 text-black text-base"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <FontAwesome name="search" size={24} color="black" />
      </View>

      {/* Alert Button */}
      <TouchableOpacity
        className="absolute bottom-48 right-5 bg-orange-500 w-16 h-16 rounded-full justify-center items-center shadow-lg"
        onPress={() => setIsModalVisible(true)}
      >
        <FontAwesome name="exclamation" size={24} color="white" />
      </TouchableOpacity>

      {/* Create Alert Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <CreateAlertScreen goBack={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    margin: 0,
    borderRadius: 0,
    overflow: "hidden",
  },
});
