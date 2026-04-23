import { useFormik } from 'formik';
import { Text, View } from 'react-native';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password is required'),
});
const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      console.log('submit');
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
        />

        <Button label="Register" onPress={() => formik.handleSubmit()} />
      </View>
    </View>
  );
};

export default SignUp;
