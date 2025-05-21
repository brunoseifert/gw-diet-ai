import { Text, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

import Constants from "expo-constants";
interface HeaderProps {
  step: string;
  title: string;
}

const statusBarHeight = Constants.statusBarHeight;

export default function Header({ step, title }: HeaderProps) {
  return (
    <View
      style={{ marginTop: statusBarHeight + 8 }}
      className="rounded-b-3xl p-4 bg-grayOne h-32 justify-center border-grayTwo border-x-2"
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="white" />
        </Pressable>
        <Text className="text-white font-bold text-lg">{step}</Text>
        <Feather name="loader" size={16} color="white" />
      </View>
      <Text className="text-white text-2xl text-center mt-2">{title}</Text>
    </View>
  );
}
