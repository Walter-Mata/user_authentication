import { TextInput as RNInput, StyleSheet, Text, View } from "react-native";

type TextInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  isPassword?:boolean
  error?: string;
};
const TextInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  isPassword,
  error,
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RNInput
        placeholder={placeholder}
        value={value}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
});

export default TextInput;
