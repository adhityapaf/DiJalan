import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import TabsNavigation from './HomeTopNavigation';
import EditProfile from './edit_profile/index';
import AccountScreen from './account/index';
import DetailPostActivity from './DetailPostActivity';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function HomeActivity() {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={TabsNavigation}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ color }) => (
              <IconMaterial name="home" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Map"
          component={TabsNavigation}
          options={{
            tabBarLabel: 'Peta',
            tabBarIcon: ({ color }) => (
              <IconMaterial name="map-search" color={color} size={26} />
            )
          }}
        />
        <Tab.Screen
          name="Profil"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Akun',
            tabBarIcon: ({ color }) => (
              <IconMaterial name="account-circle" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer
      independent={true}>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="Home"
          component={HomeActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPostActivity}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;