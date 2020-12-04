import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import LaporScreen from './screen/LaporScreen';

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lapor"
            component={LaporScreen}
            options={{
              headerShown: true,
              title: 'Lapor',
              headerStyle: {backgroundColor: '#0984E3'},
              headerTintColor: '#FFFFFF',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
