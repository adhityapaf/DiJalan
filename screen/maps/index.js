import React, { useState, useEffect } from "react";

import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const App = () => {

    const [region, setRegion] = useState({
        latitude: -6.9782626,
        longitude: 107.6302506,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    const [camera, setCamera] = useState( {
        center: {
           latitude: 0,
           longitude: 0,
       },
       pitch: 0,
       heading: 0,
    
       // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
       altitude: 0,
    
       // Only when using Google Maps.
       zoom: 15
    })

    const findCoordinates = () => {
        navigator.geolocation = require('@react-native-community/geolocation');
        navigator.geolocation.getCurrentPosition(
            geo_success => {
                // setLocation(geo_success);
                console.log(geo_success.coords.latitude);
                console.log(geo_success.coords.longitude);

                setCamera({
                    center: {
                       latitude: geo_success.coords.latitude,
                       longitude: geo_success.coords.longitude,
                   },
                   pitch: 0,
                   heading: 0,
                
                   // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
                   altitude: 0,
                
                   // Only when using Google Maps.
                   zoom: 15
                })
            },
            error => Alert.alert(error.message)
        )
    };

    useEffect(() => {
        findCoordinates();
    }, [])

    return (
        <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}
            followsUserLocation={true}
            region={region}
            camera={camera}
            onRegionChangeComplete={region => setRegion(region)}
        >
            {/* <Marker coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }} /> */}
        </MapView>
    );
};

export default App;