import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import TabsNavigation from './HomeTopNavigation';
import EditProfile from './edit_profile/index';
import Account from './account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer
      independent={true}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeActivity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeActivity = () => {
  return (
    <NavigationContainer
      independent={true}
    >
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
          component={Account}
          options={{
            tabBarLabel: 'Akun',
            tabBarIcon: ({ color }) => (
              <IconMaterial name="account-circle" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;