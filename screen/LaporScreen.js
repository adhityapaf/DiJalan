import React, {Component} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import styles from '../app.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984E3',
    accent: '#0984E3',
  },
};

function LaporScreen({navigation}) {
  const [caption, setCaption] = React.useState('');

  return (
    <PaperProvider theme={theme}>
      <View>
        <Image
          style={{height: 202, alignSelf: 'stretch'}}
          source={require('../assets/placeholder_jalanLubang.png')}
        />
        <View style={{padding: 20}}>
          <TouchableRipple
            onPress={() => console.log('Pilih Foto clicked!')}
            style={styles.button}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={styles.buttonText}>Pilih Foto</Text>
          </TouchableRipple>
          <TextInput
            style={styles.captionTextArea}
            label="Caption"
            mode="outlined"
            keyboardType="default"
            numberOfLines={5}
            multiline={true}
            selectionColor="#0984E3"
            value={caption}
            textAlignVertical="top"
            onChangeText={(text) => setCaption(text)}
          />
          <TouchableRipple
            onPress={() => console.log('Submit clicked!')}
            style={styles.button}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableRipple>
        </View>
      </View>
    </PaperProvider>
  );
}

export default LaporScreen;
