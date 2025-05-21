import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col h-full items-center justify-center bg-secondaryBlack gap-4 p-4">
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: "100%", objectFit: "contain" }}
        className="h-72"
      />
      <Text className="text-4xl font-light text-green-500 ">
        <Text className="text-primaryPurple font-medium">GymWise</Text> Diet.AI
      </Text>
      <Text className="text-white text-xl text-center">
        Sua dieta personalizada com interligência artificial
      </Text>
      <Link href="/step" asChild>
        <Pressable className="bg-primaryPurple rounded-2xl p-4 w-full absolute bottom-10">
          <Text className="text-white text-xl text-center">Gerar Dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}
