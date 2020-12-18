import React, {Component} from 'react';
import {useState, useContext} from 'react';
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
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984E3',
    accent: '#0984E3',
  },
};

const RegisterScreen = ({navigation}) => {
  const [email, handleEmail] = React.useState('');
  const [namaLengkap, handleNama] = React.useState('');
  const [noHp, handleNoHp] = React.useState('');
  const [password, handlePassword] = React.useState('');
  const [hiddenPass, hiddenState] = React.useState(true);

  const {register} = useContext(AuthContext);
  return(
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
                  onChangeText={handleNama}
                />
                <TextInput
                  style={styles.register_textField}
                  label="Email"
                  mode="outlined"
                  keyboardType="email-address"
                  selectionColor="#0984E3"
                  value={email}
                  onChangeText={handleEmail}
                />
                <TextInput
                  style={styles.register_textField}
                  label="Password"
                  autoCompleteType="password"
                  mode="outlined"
                  secureTextEntry={hiddenPass}
                  value={password}
                  onChangeText={handlePassword}
                  right={
                    <TextInput.Icon
                      name={hiddenPass ? 'eye-off' : 'eye'}
                      size={24}
                      onPress={() => hiddenState(!hiddenState)}
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
                  onChangeText={handleNoHp}
                />
                <TouchableRipple
                  onPress={() => register(email, password, namaLengkap, noHp)}
                  style={styles.button}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={styles.buttonText}>REGISTRASI</Text>
                </TouchableRipple>
                <Text style={{alignSelf: 'center', marginTop: 10}}>
                  Sudah Punya Akun? Yuk
                </Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
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
