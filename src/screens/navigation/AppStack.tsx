import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Authentication/SignIn';
import SignUp from '../Authentication/SignUp';
import { useAuth } from '../../context/MainContext';
import Home from '../Home';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  const auth = useAuth();
  return (
    <Stack.Navigator>
      {auth.user === null ? (
        <Stack.Group>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      ) :  <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Group>}
    </Stack.Navigator>
  );
};

export default AppStack;
