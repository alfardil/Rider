import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  goBack: () => void; // Function to go back to the Home screen
}

const CreateAlertScreen: React.FC<Props> = ({ goBack }) => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black px-5 py-10">
      {/* Back Button */}
      <TouchableOpacity onPress={goBack} className="mt-7 ml-5">
        <Text className="text-white text-4xl">←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-center text-2xl font-bold mb-8">
        CREATE AN ALERT:
      </Text>

      {/* Incident Report Button */}
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-5 mb-5"
        onPress={() => {
          router.push("/incident");
          goBack();
        }}
      >
        <Text className="text-white text-lg font-bold text-center">
          INCIDENT REPORT
        </Text>
      </TouchableOpacity>

      {/* Transit Update Button */}
      <TouchableOpacity className="bg-green-500 rounded-lg p-5">
        <Text className="text-white text-lg font-bold text-center">
          TRANSIT UPDATE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAlertScreen;
