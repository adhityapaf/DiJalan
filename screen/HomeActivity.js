import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import TabsNavigation from './HomeTopNavigation';
import EditProfile from './edit_profile/index';
import AccountScreen from './account/index';
import LaporScreen from './LaporScreen';
import MapsActivity from './maps/index'
import { AuthContext } from '../navigation/AuthProvider';
import Header from '../shared/header';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function MainActivity() {
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
          component={MapsActivity}
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
            ),
            headerShown:true
          }}
        />
      </Tab.Navigator>
  );
}

class App extends React.Component {
  render(){
  return (      
    <NavigationContainer
      independent={true}>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="Home"
          component={MainActivity}
          options={{    
            headerShown:false,                             
        }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: true }}
        />
     
        <Stack.Screen
          name="Lapor"
          component={LaporScreen}
          options={({route}) => ({ title: route.params.title, headerStyle: {backgroundColor: '#005690'},
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {fontWeight: 'normal'}})}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}
export default App;