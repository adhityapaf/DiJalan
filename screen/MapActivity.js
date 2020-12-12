import React from 'react';
import {useState, useRef} from 'react';
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
import styles from '../app.styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const MapActivity = ({navigation}) => {
  const renderInner = () => (
    <View style={{backgroundColor: '#FFFFFF', padding:20, height:'100%'}}>
      <Text
        style={{justifyContent: 'center', alignSelf: 'center', fontSize: 16}}>
        Pilih Jenis Laporan
      </Text>
      <View style={styles.jenisLaporanContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate('Lapor', {title: 'Lapor Jalan Rusak'});}}
        >
            <View style={styles.jenisLaporanItems}>
              <Image
                style={styles.jenisLaporanIcon}
                source={require('../assets/road_white.png')}
              />
              <Text style={styles.jenisLaporanLabel}>Jalan Rusak</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Lapor', {title: 'Lapor Kecelakaan'});}}>
          <View style={styles.jenisLaporanItems}>
            <Image
              style={{width: 54, height: 34}}
              source={require('../assets/car_accident_white.png')}
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
  return (
    <View style={styles.welcome_container}>
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
          visible= {visibileFab}
          onPress={() => {sheetRef.current.snapTo(0);}
          }
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

export default MapActivity;
