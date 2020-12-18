import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import LaporScreen from '../screen/LaporScreen';
import HomeActivity from '../screen/HomeActivity';
import DetailActivity from '../screen/DetailPostActivity';

const AppStack = createStackNavigator();
const AuthStack = () => {
    return(
        <AppStack.Navigator>
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="Lapor"
          component={LaporScreen}
          options={{
            headerShown: true,
            title: 'Lapor',
            headerStyle: {backgroundColor: '#0984E3'},
            headerTintColor: '#FFFFFF',
          }}
        />
        <AppStack.Screen
          name="Home"
          component={HomeActivity}
          options={{headerShown: false}}
        />
        <AppStack.Screen name="Detail" component={DetailActivity} />
      </AppStack.Navigator>
    );
}

export default AuthStack;