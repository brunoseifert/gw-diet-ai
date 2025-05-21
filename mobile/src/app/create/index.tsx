import Header from "@/src/components/header";
import Select from "../../components/input/select";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
  gender: z.string().min(1, { message: "o sexo é obrigatório" }),
  objective: z.string().min(1, { message: "o objetivo é obrigatório" }),
  level: z.string().min(1, { message: "o nivel é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = userDataStore((state) => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    {
      label: "Sedentário (pouca ou nenhuma atividade física",
      value: "Sedentário",
    },
    {
      label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana) ",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo (exercícios 5 a 7 vezes na semana) ",
      value: "Altamente ativo (exercícios 5 a 7 vezes na semana)",
    },
  ];

  const objectiveOptions = [
    { label: "Emagrecimento", value: "Emagrecimento" },
    { label: "Definição", value: "Definição" },
    { label: "Hipertrofia", value: "Hipertrofia" },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      objective: data.objective,
    });

    router.push("/nutrition");
  }

  return (
    <View className="bg-secondaryBlack h-full">
      <Header step="Passo 2" title="Finalizando dieta" />
      <ScrollView className="px-4">
        <Text className="text-white text-xl mt-8 mb-4">Sexo:</Text>
        <Select
          name="gender"
          control={control}
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />
        <Text className="text-white text-xl mt-8 mb-4">
          Selecione nível de atividade física:
        </Text>
        <Select
          name="level"
          control={control}
          placeholder="Selecione o seu nível..."
          error={errors.level?.message}
          options={levelOptions}
        />
        <Text className="text-white text-xl mt-8 mb-4">
          Selecione seu objetivo:
        </Text>
        <Select
          name="objective"
          control={control}
          placeholder="Selecione o seu objetivo..."
          error={errors.objective?.message}
          options={objectiveOptions}
        />

        <Pressable
          onPress={handleSubmit(handleCreate)}
          className="bg-primaryPurple mt-8 rounded-2xl p-4 w-full"
        >
          <Text className="text-xl text-white text-center">Gerar Dieta</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
