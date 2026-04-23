import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: () => void;
};
const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={{ color: '#fff' }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#0081f1',
    backgroundColor: '#0081f1',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
export default Button;
