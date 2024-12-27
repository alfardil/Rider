import ReportedProblem from "@/app/types/types";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function MapMarker({ problem }: { problem: ReportedProblem }) {
  const router = useRouter();

  return (
    <Marker
      key={problem.id}
      coordinate={problem.location}
      pinColor={problem.verified ? "red" : "yellow"}
    >
      <Callout onPress={() => router.push(`/details/${problem.id}`)}>
        <TouchableOpacity className="flex-row items-center w-60">
          <Ionicons name="information-circle" size={24} color="blue" />
          <View className="flex-1 mx-2">
            <Text
              className="font-bold"
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {problem.title}
            </Text>
            <Text
              className="text-gray-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Click for details
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </Callout>
    </Marker>
  );
}
