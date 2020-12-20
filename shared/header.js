import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import gcpConfig from "../service/gcp/config";
import Geocoder from 'react-native-geocoding';

export default function Header(props) {

  const [city, setCity] = useState("");

  const findMyLocation = () => {
    navigator.geolocation = require('@react-native-community/geolocation');
    navigator.geolocation.getCurrentPosition(
      (geo_success) => {
        // setLocation(geo_success);
        console.log(geo_success.coords.latitude);
        console.log(geo_success.coords.longitude);

        Geocoder.init(gcpConfig.API_KEY);

        Geocoder.from(geo_success.coords.latitude, geo_success.coords.longitude)
          .then(json => {
            let city = json.results[0].address_components[4].short_name;
            // console.log(addressComponent);
            setCity(city);
          })
          .catch(error => console.warn(error));

      },
      (error) => Alert.alert(error.message),
    );
  };

  useEffect(() => {
    findMyLocation();
  }, [])
  return (
    <View style={{
      backgroundColor: "#0984E3",
      height: 100
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomColor: "#fff",
        padding: 16
      }}>
        <View style={{
          flex: 2,
        }}>
          <Text>Hi,</Text>
          <Text style={{
            fontSize: 21,
            fontWeight: "bold"
          }}>{props.name}</Text>
          <Text style={{
            fontSize: 12
          }}>
            <IconMaterial name="map-marker" color="red" size={20} /> {city}
                  </Text>
        </View>
        <View style={{
          flex: 2,
        }}>
          <Image
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: 148,
              height: 70,
              resizeMode: 'contain'
            }}
            source={require('../assets/logo.png')}
          />
        </View>
      </View>
    </View>
  )
}
