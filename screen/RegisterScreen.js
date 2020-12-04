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

function RegisterScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hiddenPass, hiddenState] = React.useState(true);
  const [namaLengkap, setNamaLengkap] = React.useState('');
  const [noHp, setNoHp] = React.useState('');
  return (
    <PaperProvider theme={theme}>
      <View style={styles.welcome_container}>
        <ImageBackground
          source={require('../assets/background_welcome.png')}
          style={{
            resizeMode: 'center',
            flex: 1,
          }}>
          <View style={{padding: 40}}>
            <Image
              style={styles.img_register}
              source={require('../assets/logo.png')}
            />
            <View>
              <TextInput
                style={styles.register_textField}
                label="Nama Lengkap"
                mode="outlined"
                keyboardType="default"
                selectionColor="#0984E3"
                value={namaLengkap}
                onChangeText={(text) => setNamaLengkap(text)}
              />
              <TextInput
                style={styles.register_textField}
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                selectionColor="#0984E3"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.register_textField}
                label="Password"
                autoCompleteType="password"
                mode="outlined"
                secureTextEntry={hiddenState ? true : false}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon
                    name={hiddenState ? 'eye-off' : 'eye'}
                    size={24}
                    onPress={() => hiddenState(!hiddenPass)}
                  />
                }
              />
              <TextInput
                style={styles.register_textField}
                label="Nomer Handphone"
                mode="outlined"
                keyboardType="number-pad"
                selectionColor="#0984E3"
                value={noHp}
                onChangeText={(text) => setNoHp(text)}
              />
              <TouchableRipple
                onPress={() => console.log('Pressed')}
                style={styles.button}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={styles.buttonText}>REGISTRASI</Text>
              </TouchableRipple>
              <Text style={{alignSelf: 'center', marginTop: 10}}>
                Sudah Punya Akun? Yuk
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: '#0984E3',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
}

export default RegisterScreen;
