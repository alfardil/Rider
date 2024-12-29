import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useFakeDataStore } from "@/app/data/hooks";
import { useShallow } from "zustand/shallow";
import { subwayStops } from "../data/subwayStops";
import { submitTransitUpdateSchema } from "./types";

export default function TransitUpdateForm() {
  const router = useRouter();
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const [problems, setProblems] = useFakeDataStore(
    useShallow((state) => [state.problems, state.setProblems])
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof submitTransitUpdateSchema>>({
    resolver: zodResolver(submitTransitUpdateSchema),
    defaultValues: {
      id: problems.length > 0 ? problems[problems.length - 1].id + 1 : 1,
      title: "",
      description: "",
      status: "Open",
      date: "",
      lines: subwayStops,
      selectedLine: undefined,
      verified: false,
      location: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const selectedLine = watch("selectedLine");

  const onSubmit = (data: z.infer<typeof submitTransitUpdateSchema>) => {
    setProblems([...problems, { ...data, selectedStop }]);
    Alert.alert("Thank you for submitting a transit update!", undefined, [
      {
        text: "Go back to the map",
        onPress: () => {
          router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <ScrollView>
        <Text className="text-white text-2xl font-bold text-center mb-6">
          Transit Update
        </Text>

        {/* Title Field */}
        <Text className="text-white text-lg font-bold mb-2">Title</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className="bg-gray-800 text-white p-4 rounded-lg mb-2"
              placeholder="Enter Title"
              placeholderTextColor="#9CA3AF"
            />
          )}
        />
        {errors.title && (
          <Text className="text-red-500 mb-2">{errors.title.message}</Text>
        )}

        {/* Description Field */}
        <Text className="text-white text-lg font-bold mt-4 mb-2">
          Description
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className="bg-gray-800 text-white p-4 rounded-lg mb-2"
              placeholder="Enter Description"
              placeholderTextColor="#9CA3AF"
              multiline
            />
          )}
        />
        {errors.description && (
          <Text className="text-red-500 mb-2">
            {errors.description.message}
          </Text>
        )}

        {/* Status Field */}
        <Text className="text-white text-lg font-bold mt-4 mb-2">Status</Text>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row justify-around mb-2">
              {["Open", "In Progress", "Resolved"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => onChange(opt)}
                  className={`px-4 py-2 rounded-lg ${
                    value === opt ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  <Text className="text-white font-bold">{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {errors.status && (
          <Text className="text-red-500 mb-2">{errors.status.message}</Text>
        )}

        {/* Date Field */}
        <Text className="text-white text-lg font-bold mt-4 mb-2">
          Date (YYYY-MM-DD)
        </Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className="bg-gray-800 text-white p-4 rounded-lg mb-2"
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
            />
          )}
        />
        {errors.date && (
          <Text className="text-red-500 mb-2">{errors.date.message}</Text>
        )}

        {/* Train Lines */}
        <Text className="text-white text-lg font-bold mt-4 mb-2">
          Select a Train Line
        </Text>
        <Controller
          control={control}
          name="selectedLine"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap">
              {Object.keys(watch("lines")).map((line) => (
                <TouchableOpacity
                  key={line}
                  onPress={() => onChange(line)}
                  className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                    value === line ? "bg-green-500" : "bg-gray-700"
                  }`}
                >
                  <Text className="text-white font-bold">Line {line}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {errors.selectedLine && (
          <Text className="text-red-500 mb-2">
            {errors.selectedLine.message}
          </Text>
        )}

        {/* Stops */}
        {selectedLine && (
          <View>
            <Text className="text-white text-lg font-bold mt-4 mb-2">
              Stops for Line {selectedLine}
            </Text>
            {watch("lines")[selectedLine]?.map((stop) => (
              <TouchableOpacity
                key={stop.name}
                onPress={() => {
                  if (selectedStop === stop.name) {
                    setSelectedStop(null);
                    setValue("location.latitude", 0);
                    setValue("location.longitude", 0);
                  } else {
                    setSelectedStop(stop.name);
                    // set the form location to the selected stop's coords
                    setValue("location.latitude", stop.latitude);
                    setValue("location.longitude", stop.longitude);
                  }
                }}
                className={`mb-2 p-3 rounded-lg ${
                  selectedStop === stop.name ? "bg-green-500" : "bg-gray-800"
                }`}
              >
                <Text className="text-white text-base font-bold">
                  {stop.name}
                </Text>
                <Text className="text-gray-300 text-sm">
                  Lat: {stop.latitude} - Lng: {stop.longitude}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Submit Button */}
        <View className="mt-8">
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
}
