import React from "react";
import {View,Text,Image} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Header(props){
    return(
        <View style={{
          backgroundColor:"#0984E3",
          height:100
        }}>
          <View style={{
            flex:1,
            flexDirection:'row',        
            borderBottomWidth:1,
            backgroundColor:"#fff",
            borderBottomLeftRadius:15,
            borderBottomRightRadius:15,
            borderBottomColor:"#fff",
            padding:16
          }}>        
            <View style={{
              flex:2,          
            }}>
              <Text>Hi,</Text>
              <Text style={{
                  fontSize:21,
                  fontWeight:"bold"
              }}>{props.name}</Text>              
              <Text style={{
                  fontSize:12
              }}>
                    <IconMaterial name="map-marker" color="red" size={20} /> Bandung
                  </Text>
            </View>
            <View style={{
              flex:2,
            }}>
               <Image
                  style={{                
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: 148,
                    height: 70,
                    resizeMode:'contain'
                  }}
                  source={require('../assets/logo.png')}
                />
            </View>
          </View>      
        </View>
      )
}
  