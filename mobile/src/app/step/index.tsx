import Header from "@/src/components/header";
import Input from "@/src/components/input";
import { Text, View, ScrollView, Pressable } from "react-native";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { userDataStore } from "@/store/data";

const schema = z.object({
  name: z.string().min(1, { message: "o nome é obrigatório" }),
  weight: z.string().min(1, { message: "o peso é obrigatório" }),
  age: z.string().min(1, { message: "a idade é obrigatório" }),
  height: z.string().min(1, { message: "a altura é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageOne = userDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      age: data.age,
      height: data.height,
      weight: data.weight,
    });

    router.push("/create");
  }

  return (
    <View className="bg-secondaryBlack h-full">
      <Header step="Passo 1" title="Vamos começar" />
      <ScrollView className="px-6 mt-2">
        <Text className="text-white text-xl mt-8 mb-4">Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite o nome"
          error={errors.name?.message}
          keyboardType="default"
        />
        <Text className="text-white text-xl mt-6 mb-4">Seu peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />
        <Text className="text-white text-xl mt-6 mb-4">Sua altura:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.90"
          error={errors.height?.message}
          keyboardType="numeric"
        />
        <Text className="text-white text-xl mt-6 mb-4">Sua idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 25"
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Pressable
          onPress={handleSubmit(handleCreate)}
          className="bg-primaryPurple mt-8 rounded-2xl p-4 w-full"
        >
          <Text className="text-xl text-white text-center">Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
