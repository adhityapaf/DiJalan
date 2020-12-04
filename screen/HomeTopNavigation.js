import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import JalanRusakScreen from './JalanRusakActivity';
import KecelakaanScreen from './KecelakaanActivity';
const Tab = createMaterialTopTabNavigator();


const HomeTabsNavigation = ()=>{
    return(            
        <Tab.Navigator
            initialRouteName="JalanRusakScreen"
            tabBarOptions={{
            activeTintColor: 'white',
            indicatorStyle:{backgroundColor:'white'},
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: '#0984E3' },
            }}
        >
            <Tab.Screen
            name="JalanRusakScreen"
            component={JalanRusakScreen}
            options={{tabBarLabel:'Jalan Rusak'}}
            />

            <Tab.Screen
            name="KecelakaanScreen"
            component ={KecelakaanScreen}
            options = {{tabBarLabel:'Kecelakaan'}}
            />            
        </Tab.Navigator>        
    )
}

export default HomeTabsNavigation;