import React from "react";
import { View, Text, TextInput } from "react-native";
import { Controller, UseFormReturn } from "react-hook-form";

interface DateFieldProps {
  form: UseFormReturn<any>;
  label?: string;
  readOnly?: boolean;
}
export function DateField({ form, label = "Date", readOnly }: DateFieldProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View>
      <Text className="text-white text-lg font-bold mt-4 mb-2">{label}</Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            editable={!readOnly}
            className="bg-gray-800 text-white p-4 rounded-lg mb-2"
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#9CA3AF"
          />
        )}
      />
      {errors.date && (
        <Text className="text-red-500 mb-2">
          {errors.date.message as string}
        </Text>
      )}
    </View>
  );
}
