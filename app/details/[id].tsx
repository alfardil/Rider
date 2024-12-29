import { useFakeDataStore } from "@/app/data/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const problem = useMemo(
    () => problems.find((p) => p.id === Number(id)),
    [id, problems]
  );

  if (!problem) {
    router.push("/+not-found");
    return null;
  }

  const handleUpvote = () => {
    if (userVote === "up") {
      setUserVote(null);
      setUpvotes((prev) => prev - 1);
    } else if (userVote === "down") {
      setUserVote("up");
      setDownvotes((prev) => prev - 1);
      setUpvotes((prev) => prev + 1);
    } else {
      setUserVote("up");
      setUpvotes((prev) => prev + 1);
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setUserVote(null);
      setDownvotes((prev) => prev - 1);
    } else if (userVote === "up") {
      setUserVote("down");
      setUpvotes((prev) => prev - 1);
      setDownvotes((prev) => prev + 1);
    } else {
      setUserVote("down");
      setDownvotes((prev) => prev + 1);
    }
  };

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
        onPress={() =>
          router.push({
            pathname: "/",
            params: {
              lat: problem.location.latitude,
              lng: problem.location.longitude,
            },
          })
        }
      >
        <Marker
          coordinate={{
            latitude: problem.location.latitude,
            longitude: problem.location.longitude,
          }}
        />
      </MapView>

      <View className="flex flex-row justify-center space-x-12 mt-16">
        {/* Upvote */}
        <View className="items-center">
          <TouchableOpacity onPress={handleUpvote}>
            <Text className="text-white text-3xl">👍</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl mt-2">{upvotes}</Text>
        </View>

        {/* Downvote */}
        <View className="items-center">
          <TouchableOpacity onPress={handleDownvote}>
            <Text className="text-white text-3xl">👎</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl mt-2">{downvotes}</Text>
        </View>
      </View>
    </View>
  );
}
