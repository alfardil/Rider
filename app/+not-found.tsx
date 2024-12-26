import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white">
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 py-2 px-4 bg-blue-500 rounded-lg">
          <Text className="text-white font-medium">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
