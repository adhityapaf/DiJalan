import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import TabsNavigation from './HomeTopNavigation'; 
import EditProfile from './edit_profile/index';

const Tab = createBottomTabNavigator();

const App = () => {
  return (    
    <NavigationContainer
    independent={true}
    >
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={TabsNavigation}
          options={{
            tabBarLabel:'Beranda',
            tabBarIcon:({color})=>(
              <IconMaterial name="home" color={color} size={26}/>
            )
          }}
           /> 
           <Tab.Screen 
          name="Map" 
          component={TabsNavigation}
          options={{
            tabBarLabel:'Peta',
            tabBarIcon:({color})=>(
              <IconMaterial name="map-search" color={color} size={26}/>
            )
          }}
           /> 
           <Tab.Screen 
          name="Profil" 
          component={EditProfile}
          options={{
            tabBarLabel:'Akun',
            tabBarIcon:({color})=>(
              <IconMaterial name="account-circle" color={color} size={26}/>
            )
          }}
           />        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;