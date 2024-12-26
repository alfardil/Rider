import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ReportedProblem, RootStackParamList } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FAKE_DATA } from "../data/fakeData";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const Dashboard: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [problems, setProblems] = useState<ReportedProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProblems = () => {
    setLoading(true);
    setTimeout(() => {
      setProblems(FAKE_DATA);
      setError(null);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setProblems(FAKE_DATA);
      setRefreshing(false);
    }, 1000);
  };

  const renderProblem = ({ item }: { item: ReportedProblem }) => {
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

    return (
      <View className="bg-gray-800 p-4 rounded-lg mb-4">
        <Text className="text-lg font-bold text-white">{item.title}</Text>
        <Text className="text-sm text-gray-400">{item.description}</Text>
        <Text className="text-sm mt-2 text-gray-300">
          Status:{" "}
          <Text className={getStatusColor(item.status)}>{item.status}</Text>
        </Text>
        <Text className="text-sm mt-1 text-gray-300">
          Reported on: {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      {error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg mb-4">{error}</Text>
          <Button title="Retry" onPress={fetchProblems} />
        </View>
      ) : problems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-200 text-lg">
            No reported problems found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={problems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProblem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
