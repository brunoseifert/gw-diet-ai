import Header from "@/src/components/header";
import { Pressable, ScrollView, Share, Text, View } from "react-native";
import { api } from "../../../server/api";
import { userDataStore } from "@/store/data";
import { useQuery } from "@tanstack/react-query";
import { Data } from "@/types/data";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = userDataStore((state) => state.user);

  const statusBarHeight = Constants.statusBarHeight;

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Filed load nutrition");
        }

        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          objective: user.objective,
          level: user.level,
        });

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isFetching) {
    return (
      <View className="flex-1 bg-grayOne justify-center items-center">
        <Text className="text-white">Estamos gerando sua dieta!</Text>
        <Text className="text-white">Consultando IA...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 bg-Red justify-center items-center">
        <Text>Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map((item) => ` ${item}`)}`;

      const foods = `${data?.refeicoes.map(
        (item) =>
          `\n- Nome: ${item.nome}\n- Horário: ${
            item.horario
          }\n- Alimentos: ${item.alimentos.map((alimento) => ` ${alimento}`)}`
      )}`;

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View className="bg-secondaryBlack flex-1">
      <View
        style={{ marginTop: statusBarHeight + 8 }}
        className="rounded-b-3xl p-4 bg-grayOne h-32 justify-center border-grayTwo border-x-2"
      >
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-4">
            <Feather name="user" size={20} color="#ffffff" />
            <Text className="text-2xl text-white">Minha dieta</Text>
          </View>

          <Pressable
            onPress={handleShare}
            className="bg-primaryPurple rounded-xl p-4 w-fit flex flex-row items-center justify-center gap-2"
          >
            <Text>Compartilhar</Text>
            <Feather name="share" size={14} color="#000" />
          </Pressable>
        </View>
      </View>

      <View className="m-4 flex-1">
        {data && Object.keys(data).length > 0 && (
          <>
            <Text className="text-2xl text-white">Nome: {data.nome}</Text>
            <Text className="text-lg font-light text-white mb-4">
              Foco: {data.objetivo}
            </Text>

            <Text className="text-xl text-white mb-4">Refeições:</Text>
            <ScrollView className="bg-grayOne rounded-lg">
              <View className="gap-4 p-2">
                {data.refeicoes.map((refeicao) => (
                  <View
                    key={refeicao.nome}
                    className="border-grayTwo border-b-[1px] rounded-lg p-2"
                  >
                    <View className="flex flex-row justify-between mb-1">
                      <Text className="text-white font-bold">
                        {refeicao.nome}
                      </Text>
                      <Ionicons name="restaurant" size={16} color="#ffffff" />
                    </View>

                    <View className="flex flex-row items-center gap-2">
                      <Feather name="clock" size={14} color="#ffffff" />
                      <Text className="text-white font-light">
                        Horário: {refeicao.horario}
                      </Text>
                    </View>

                    <Text className="text-white mt-6 mb-2 font-bold">
                      Alimentos:
                    </Text>
                    {refeicao.alimentos.map((alimento) => (
                      <Text key={alimento} className="text-white">
                        {alimento}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>

              <View className="p-4">
                <Text className="text-white font-bold  mb-2">
                  Dica suplementos:
                </Text>
                {data.suplementos.map((item) => (
                  <Text key={item} className="text-white">
                    {item}
                  </Text>
                ))}
              </View>
            </ScrollView>
          </>
        )}
        <Pressable
          onPress={() => router.replace("/")}
          className="bg-primaryPurple mt-8 rounded-2xl p-4 w-full"
        >
          <Text className="text-xl text-white text-center">
            Gerar nova dieta
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
