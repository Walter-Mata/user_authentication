import { useState } from 'react';
import {
  Image,
  Platform,
  TextInput as RNInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TextInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  isPassword?: boolean;
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
  const [showPassword, setShowPassword] = useState(isPassword);
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RNInput
        placeholder={placeholder}
        value={value}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 10,
            top: Platform.OS === 'android' ? 40 : 35,
          }}
        >
          <Image
            source={
              showPassword
                ? require('../../assets/images/eye-open.png')
                : require('../../assets/images/eye-shut.png')
            }
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
});

export default TextInput;
