import { useFakeDataStore } from "@/app/data/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import dayjs from "dayjs";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Resolved":
      return "text-green-500";
    case "In Progress":
      return "text-yellow-500";
    case "Open":
      return "text-red-500";
    default:
      return "text-white";
  }
};

export default function Details() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const problems = useFakeDataStore((state) => state.problems);

  const problem = useMemo(
    () => problems.find((p) => p.id === Number(id)),
    [id, problems]
  );

  if (!problem) {
    router.push("/+not-found");
    return <></>;
  }

  return (
    <View className="flex flex-col items-center h-screen p-8 bg-gray-800">
      <Text className="font-bold text-white text-4xl">{problem.title}</Text>
      <Text className="text-base text-gray-400">{problem.description}</Text>
      <Text className="text-sm mt-4 text-gray-300">
        Status:{" "}
        <Text className={getStatusColor(problem.status)}>{problem.status}</Text>
      </Text>
      <Text className="text-sm mt-4 text-gray-300">
        Reported on: {dayjs(problem.date, "YYYY-MM-DD").format("MM/DD/YYYY")}
      </Text>
      <MapView
        style={{
          width: "100%",
          height: 300,
          borderRadius: 10,
          marginTop: 84,
        }}
        region={{
          latitude: problem.location.latitude,
          longitude: problem.location.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0521,
        }}
        pitchEnabled={false}
        zoomEnabled={false}
        zoomControlEnabled={false}
        rotateEnabled={false}
        zoomTapEnabled={false}
        scrollDuringRotateOrZoomEnabled={false}
        scrollEnabled={false}
        // TODO - On press event, should be taken to index page with the coordinates centered.
      >
        <Marker
          coordinate={{
            latitude: problem.location.latitude,
            longitude: problem.location.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
