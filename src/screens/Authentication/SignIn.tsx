import { useFormik } from 'formik';
import { Alert, Text, View } from 'react-native';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/MainContext';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password is required'),
});
const SignIn = () => {
  const auth = useAuth();
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      const response = await auth.login(values.email, values.password);
      if (!response.success) {
        Alert.alert(response?.message || '');
        return;
      }
    },
  });
  const values = formik.values;
  const errors = formik.errors;
  const setFieldValue = (field: string, value: string) =>
    formik.setFieldValue(field, value);

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: '#fff',
        rowGap: 20,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 24 }}>Sign-In your account</Text>

      <View style={{ rowGap: 5 }}>
        <TextInput
          label="Email"
          value={values.email}
          onChangeText={text => setFieldValue('email', text)}
          error={errors.email}
        />
        <TextInput
          label="Password"
          value={values.password}
          onChangeText={text => setFieldValue('password', text)}
          error={errors.password}
          isPassword={true}
        />
      </View>
      <View style={{ rowGap: 10 }}>
        <Button label="Sign-In" onPress={() => formik.handleSubmit()} />
        <Button label="Sign-Up" onPress={goToSignUp} />
      </View>
    </View>
  );
};

export default SignIn;
