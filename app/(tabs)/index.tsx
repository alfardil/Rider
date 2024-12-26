import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { FAKE_DATA } from "../data/fakeData";
import CreateAlertScreen from "@/components/CreateAlertScreen";
import { useLocation } from "@/hooks/useLocation";

const { height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 80;

const Home: React.FC = () => {
  const { region } = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-black">
      {/* Map */}
      {region ? (
        <MapView
          style={[styles.map, { height: height - TAB_BAR_HEIGHT }]}
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
      <View className="absolute bottom-32 left-5 right-5 flex-row bg-white rounded-full px-4 items-center">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          className="flex-1 h-10 text-black text-base"
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
