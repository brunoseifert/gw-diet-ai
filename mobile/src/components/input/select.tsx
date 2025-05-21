import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface OptionsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionsProps[];
}

export default function Select({
  name,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              className="bg-grayOne flex flex-row justify-between border-[1px] border-grayTwo rounded-xl text-white placeholder:text-grayThree px-4 py-3"
              onPress={() => setVisible(true)}
            >
              <Text className="text-grayThree">
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <Feather name="arrow-down" size={20} color="#838896" />
            </TouchableOpacity>

            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                activeOpacity={1}
                className="flex-1 justify-center p-8 bg-secondaryBlack/80"
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity activeOpacity={1} className="rounded-xl">
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity className="flex h-24 justify-center">
                        <Text
                          className="text-xl text-white/80 p-4 rounded-xl border-2 border-grayTwo bg-grayOne"
                          onPress={() => {
                            onChange(item.value);
                            setVisible(false);
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />
      {error && <Text className="text-Red">{error}</Text>}
    </View>
  );
}
