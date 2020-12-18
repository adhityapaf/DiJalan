import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  TouchableRipple,
  FAB,
} from 'react-native-paper';
import styles from '../../app.styles';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';

const App = ({ navigation }) => {

  const [marker, setMarker] = useState([])

  const [camera, setCamera] = useState({
    center: {
      latitude: 0,
      longitude: 0,
    },
    pitch: 0,
    heading: 0,

    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    altitude: 0,

    // Only when using Google Maps.
    zoom: 15,
  });

  const getMarket = () => {
    database()
      .ref('posts/')
      .once('value')
      .then((snapshot) => {
        // console.log('User data: ', snapshot.val());
        setMarker([])
        let mark = [];
        snapshot.forEach(data => {
          // if (data.child('postLat').val() && data.child('postLong').val()) {
          // console.log(data.child('postLat'));
          console.log(data.child('postLong'), "a");
          mark.push({
            latitude: data.child('postLat').val(),
            longitude: data.child('postLong').val()
          })
          // }
        })
        setMarker(mark);
        // console.log(marker) 
      });
  }


  const findCoordinates = () => {
    navigator.geolocation = require('@react-native-community/geolocation');
    navigator.geolocation.getCurrentPosition(
      (geo_success) => {
        // setLocation(geo_success);
        // console.log(geo_success.coords.latitude);
        // console.log(geo_success.coords.longitude);

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
          zoom: 17,
        });
      },
      (error) => Alert.alert(error.message),
    );
  };

  const renderInner = () => (
    <View style={{ backgroundColor: '#FFFFFF', padding: 20, height: '100%' }}>
      <Text
        style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 16 }}>
        Pilih Jenis Laporan
      </Text>
      <View style={styles.jenisLaporanContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Lapor', { title: 'Lapor Jalan Rusak' });
          }}>
          <View style={styles.jenisLaporanItems}>
            <Image
              style={styles.jenisLaporanIcon}
              source={require('../../assets/road_white.png')}
            />
            <Text style={styles.jenisLaporanLabel}>Jalan Rusak</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Lapor', { title: 'Lapor Kecelakaan' });
          }}>
          <View style={styles.jenisLaporanItems}>
            <Image
              style={{ width: 54, height: 34 }}
              source={require('../../assets/car_accident_white.png')}
            />
            <Text style={styles.jenisLaporanLabel}>Kecelakaan</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const [visibileFab, setVisiFAB] = React.useState(true);

  sheetRef = React.createRef();
  fall = new Animated.Value(1);

  useEffect(() => {
    findCoordinates();
    // getMarket();
  }, []);

  return (
    <View style={styles.welcome_container}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        camera={camera}>
        <Marker coordinate={{ latitude: -6.9771305, longitude: 107.6330418 }} />
        <Marker coordinate={{ latitude: -6.9782626, longitude: 107.6302506 }} />
        <Marker coordinate={{ latitude: -6.9771402, longitude: 107.6330448 }} />
        {/* {marker.forEach(mark => console.log(mark.latitude + " dan " + mark.longitude) )} */}
        {/* {marker.forEach(mark => <Marker coordinate={{ latitude: mark.latitude, longitude: mark.longitude }} /> )} */}
        {/* {mapMarkers(marker)} */}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: '85%',
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FAB
          style={styles.fab}
          icon="message-alert"
          color="#FFFFFF"
          visible={visibileFab}
          onPress={() => {
            sheetRef.current.snapTo(0);
          }}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 330, 0]}
        initialSnap={2}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
        enabledContentGestureInteraction={false}
        borderRadius={10}
        renderHeader={renderHeader}
        renderContent={renderInner}
        onOpenStart={() => setVisiFAB(false)}
        onCloseEnd={() => setVisiFAB(true)}
      />
    </View>
  );
};

export default App;
