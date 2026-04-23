import { useFormik } from 'formik';
import { Alert, Text, View } from 'react-native';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useAuth } from '../../context/MainContext';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format.')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length less than 6 characters.')
    .matches(/[a-z]/, 'Invalid Password format.')
    .matches(/[A-Z]/, 'Invalid Password format.')
    .matches(/[0-9]/, 'Invalid Password format.')
    .matches(/[@$!%*?&#]/, 'Invalid Password format.')
});
const SignUp = () => {
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: async values => {
      const response = await auth.signup({
        ...values,
      });
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

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', rowGap: 20, flex: 1 }}>
      <Text style={{ fontSize: 24 }}>Create an account</Text>

      <View style={{ rowGap: 5 }}>
        <TextInput
          label="Name"
          value={values.name}
          onChangeText={text => setFieldValue('name', text)}
          error={errors.name}
        />
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
          isPassword
        />
      </View>
      <Button label="Register" onPress={() => formik.handleSubmit()} />
    </View>
  );
};

export default SignUp;
