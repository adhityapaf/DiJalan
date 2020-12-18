import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../shared/header';
import * as React from 'react';
import JalanRusakScreen from './JalanRusakActivity';
import KecelakaanScreen from './KecelakaanActivity';
import DetailPostActivity from './DetailPostActivity';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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

class App extends React.Component{
    render(){
        return(
            <NavigationContainer
            independent={true}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"                    
                        component={HomeTabsNavigation}
                        options={{
                            headerShown:true,
                            header: ()=><Header name="Alwanly"/>                          
                        }}
                    />                                      
                    <Stack.Screen
                        name="Detail"
                        component={DetailPostActivity}                                  
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;